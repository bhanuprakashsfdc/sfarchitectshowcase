import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.join(__dirname, '..')
const PUBLIC_DIR = path.join(PROJECT_ROOT, 'public')

function scanProjects() {
  const entries = fs.readdirSync(PUBLIC_DIR, { withFileTypes: true })
  const projects = []

  for (const entry of entries) {
    if (!entry.isDirectory() || entry.name.startsWith('.') || entry.name === 'scenarios.json') continue

    const projectPath = path.join(PUBLIC_DIR, entry.name)
    const project = scanProject(projectPath, entry.name)
    if (project) {
      projects.push(project)
    }
  }

  return projects
}

function scanProject(projectPath, projectName) {
  // Look for problem.md or similar
  const problemFiles = ['problem.md', 'PROBLEM.md', 'Problem.md', 'challenge.md', 'scenario.md']
  let problemContent = ''
  let problemFile = ''

  for (const pf of problemFiles) {
    const fullPath = path.join(projectPath, pf)
    if (fs.existsSync(fullPath)) {
      problemContent = fs.readFileSync(fullPath, 'utf-8')
      problemFile = pf
      break
    }
  }

  // Also check in subdirectories
  if (!problemContent) {
    const found = findProblemFile(projectPath)
    if (found) {
      problemContent = found.content
      problemFile = found.relativePath
    }
  }

  // Get all markdown files in project
  const mdFiles = getAllMarkdownFiles(projectPath)
  
  // Categorize files
  const categories = categorizeFiles(mdFiles, projectPath)

  // Extract problem summary
  const problemSummary = extractProblemSummary(problemContent)

  return {
    id: projectName,
    name: formatProjectName(projectName),
    path: projectName,
    problemFile,
    problemSummary,
    problemContent,
    fileCount: mdFiles.length,
    categories,
    files: mdFiles.map(f => ({
      name: path.basename(f, '.md'),
      path: path.relative(PUBLIC_DIR, f),
      category: getFileCategory(f, projectPath)
    }))
  }
}

function findProblemFile(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      const found = findProblemFile(fullPath)
      if (found) return found
    } else if (entry.name.toLowerCase().includes('problem') && entry.name.endsWith('.md')) {
      return {
        content: fs.readFileSync(fullPath, 'utf-8'),
        relativePath: path.relative(PUBLIC_DIR, fullPath)
      }
    }
  }
  return null
}

function getAllMarkdownFiles(dir) {
  const files = []
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...getAllMarkdownFiles(fullPath))
    } else if (entry.name.endsWith('.md') && !entry.name.startsWith('.')) {
      files.push(fullPath)
    }
  }
  return files
}

function categorizeFiles(files, projectPath) {
  const categories = {}
  for (const file of files) {
    const category = getFileCategory(file, projectPath)
    if (!categories[category]) categories[category] = []
    categories[category].push(path.basename(file, '.md'))
  }
  return categories
}

function getFileCategory(file, projectPath) {
  const relative = path.relative(projectPath, file).toLowerCase()
  
  if (relative.includes('problem')) return 'Problem Statement'
  if (relative.includes('decision') || relative.includes('adr')) return 'Architecture Decisions'
  if (relative.includes('design')) return 'Solution Design'
  if (relative.includes('discovery') || relative.includes('requirement')) return 'Discovery & Requirements'
  if (relative.includes('delivery') || relative.includes('deploy') || relative.includes('devops') || relative.includes('ci-cd') || relative.includes('environment') || relative.includes('governance')) return 'Delivery & DevOps'
  if (relative.includes('operation') || relative.includes('monitor') || relative.includes('runbook') || relative.includes('risk') || relative.includes('performance') || relative.includes('excellence')) return 'Operations'
  if (relative.includes('report')) return 'Architecture Reports'
  if (relative.includes('kt-') || relative.includes('knowledge')) return 'Knowledge Transfer'
  if (relative.includes('agentforce')) return 'Agentforce Reference'
  return 'Other'
}

function extractProblemSummary(content) {
  if (!content) return 'No problem statement found'
  
  const lines = content.split('\n')
  let summary = ''
  let inContent = false
  
  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed.startsWith('#')) {
      if (inContent) break
      continue
    }
    if (trimmed && !inContent) {
      inContent = true
    }
    if (inContent && trimmed) {
      summary += trimmed + ' '
      if (summary.length > 200) break
    }
  }
  
  return summary.trim().slice(0, 200) + (summary.length > 200 ? '...' : '')
}

function formatProjectName(name) {
  return name
    .replace(/-/g, ' ')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
}

const projects = scanProjects()

const outputPath = path.join(PUBLIC_DIR, 'projects.json')
fs.writeFileSync(outputPath, JSON.stringify({ projects, generated: new Date().toISOString() }, null, 2))
console.log(`Projects index written to ${outputPath}`)
console.log(`Found ${projects.length} projects:`)
projects.forEach(p => console.log(`  - ${p.name}: ${p.fileCount} files, Problem: ${p.problemFile || 'none'}`))