import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.join(__dirname, '..')

const CATEGORY_KEYWORDS = {
  'Business Problem Statement': ['problem.md'],
  'Architecture Decisions (ADRs)': ['adr-', 'architecture-decision', 'architecture-decisions', 'adr-index'],
  'Solution Design': ['design/', 'integration-design', 'sequence-diagrams', 'detailed-solution', 'api-specifications', 'security-architecture', 'data-architecture', 'high-level-design'],
  'Discovery & Requirements': ['discovery/', 'non-functional', 'solution-architecture'],
  'Delivery & DevOps': ['delivery/', 'deployment-plan', 'ci-cd', 'devops', 'environment-strategy', 'governance-framework'],
  'Operations': ['operations/', 'monitoring-strategy', 'runbook', 'risk-register', 'performance-management', 'operational-excellence', 'best-practices'],
  'Architecture Reports': ['reports/', 'executive-summary', 'architecture-debate', 'salesforce-cloud', 'self-critique', 'solution-recommendation', 'final-quality-gate'],
  'Knowledge Transfer': ['kt-document'],
  'Agentforce Overview': ['agentforce/readme'],
  'Agentforce Fundamentals': ['01-agentforce-fundamentals'],
  'Atlas Reasoning Engine': ['02-atlas-reasoning'],
  'Topics': ['03-topics'],
  'Actions': ['04-actions'],
  'Prompt Builder': ['05-prompt-builder'],
  'Context & Grounding': ['06-context-grounding'],
  'RAG & Vector Search': ['07-rag-vector-search'],
  'Data Cloud': ['08-data-cloud'],
  'Trust & Security': ['09-trust-security']
}

function getCategory(filePath, content) {
  const lowerPath = filePath.toLowerCase()
  const lowerContent = content.toLowerCase()

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    for (const keyword of keywords) {
      if (lowerPath.includes(keyword.toLowerCase()) || lowerContent.includes(keyword.toLowerCase())) {
        return category
      }
    }
  }
  return 'General'
}

function extractTitle(filePath, content) {
  const fileName = path.basename(filePath, '.md')
  
  const headingMatch = content.match(/^#\s+(.+)$/m)
  if (headingMatch) {
    return headingMatch[1].trim()
  }

  return fileName
    .replace(/-/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
}

function extractDescription(content) {
  const lines = content.split('\n')
  let description = ''
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
      description += trimmed + ' '
      if (description.length > 300) break
    }
  }

  return description.trim().slice(0, 300) + (description.length > 300 ? '...' : '')
}

function extractTags(content, category) {
  const tags = new Set()
  const lowerContent = content.toLowerCase()

  const tagKeywords = {
    'salesforce': ['salesforce', 'sfdc', 'sales cloud', 'service cloud'],
    'architecture': ['architecture', 'architect', 'design pattern'],
    'integration': ['integration', 'api', 'mulesoft', 'middleware'],
    'data': ['data cloud', 'cdp', 'data graph', 'identity resolution'],
    'security': ['security', 'shield', 'encryption', 'compliance'],
    'ai': ['ai', 'einstein', 'agentforce', 'llm', 'generative'],
    'devops': ['ci/cd', 'devops', 'deployment', 'pipeline'],
    'monitoring': ['monitoring', 'observability', 'alerting'],
    'governance': ['governance', 'policy', 'compliance'],
    'performance': ['performance', 'scalability', 'optimization']
  }

  for (const [tag, keywords] of Object.entries(tagKeywords)) {
    for (const keyword of keywords) {
      if (lowerContent.includes(keyword)) {
        tags.add(tag)
        break
      }
    }
  }

  tags.add(category.toLowerCase().replace(/\s+/g, '-'))
  return Array.from(tags).slice(0, 5)
}

function scanDirectory(dir) {
  const files = []
  const entries = fs.readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...scanDirectory(fullPath))
    } else if (entry.name.endsWith('.md') && !entry.name.startsWith('.')) {
      files.push(fullPath)
    }
  }
  return files
}

function scanProject() {
  console.log('Scanning project for markdown files...')
  const mdFiles = scanDirectory(path.join(PROJECT_ROOT, 'public'))
  console.log(`Found ${mdFiles.length} markdown files`)

  const scenarios = []
  const categories = new Set()

  for (const file of mdFiles) {
    try {
      const content = fs.readFileSync(file, 'utf-8')
      const relativePath = path.relative(PROJECT_ROOT, file)
      const category = getCategory(relativePath, content)
      const title = extractTitle(relativePath, content)
      const description = extractDescription(content)
      const tags = extractTags(content, category)

      categories.add(category)

      scenarios.push({
        file: relativePath,
        category,
        title,
        description,
        tags
      })
    } catch (error) {
      console.error(`Error reading ${file}:`, error.message)
    }
  }

  const stats = {
    files: mdFiles.length,
    scenarios: scenarios.length,
    categories: categories.size
  }

  console.log(`Extracted ${scenarios.length} scenarios across ${categories.size} categories`)

  return { scenarios, stats }
}

const result = scanProject()

const outputPath = path.join(PROJECT_ROOT, 'public', 'scenarios.json')
fs.writeFileSync(outputPath, JSON.stringify(result, null, 2))
console.log(`Results written to ${outputPath}`)

export { scanProject }