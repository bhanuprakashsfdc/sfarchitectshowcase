import React, { useState, useEffect } from 'react'

const App = () => {
  const [projects, setProjects] = useState([])
  const [selectedProject, setSelectedProject] = useState(null)
  const [activeTab, setActiveTab] = useState('problem')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch('/projects.json')
      const data = await response.json()
      setProjects(data.projects.filter(p => p.fileCount > 0))
    } catch (error) {
      console.error('Failed to load projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const selectProject = (project) => {
    setSelectedProject(project)
    setActiveTab('problem')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const backToProjects = () => {
    setSelectedProject(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const loadFileContent = async (filePath) => {
    try {
      const response = await fetch(`/${filePath}`)
      return await response.text()
    } catch {
      return 'Failed to load content'
    }
  }

  if (loading) {
    return (
      <div className="app">
        <div className="loading">Loading projects...</div>
      </div>
    )
  }

  if (selectedProject) {
    return <ProjectDetail 
      project={selectedProject} 
      activeTab={activeTab} 
      setActiveTab={setActiveTab}
      onBack={backToProjects}
    />
  }

  return (
    <div className="app">
      <header className="header">
        <h1>SF Architect Showcase</h1>
        <p>Architecture Projects Portfolio</p>
        <div className="project-count">{projects.length} Project{projects.length !== 1 ? 's' : ''} Available</div>
      </header>

      <main className="main">
        <section className="projects-grid" aria-label="Projects">
          {projects.map(project => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onClick={() => selectProject(project)} 
            />
          ))}
        </section>
      </main>
    </div>
  )
}

const ProjectCard = ({ project, onClick }) => {
  const categoryCounts = Object.entries(project.categories)
    .map(([cat, files]) => `${cat} (${files.length})`)
    .join(', ')

  return (
    <article className="project-card" onClick={onClick} tabIndex={0} onKeyDown={e => e.key === 'Enter' && onClick()}>
      <div className="card-header">
        <span className="project-tag">{project.name}</span>
        <span className="file-count">{project.fileCount} files</span>
      </div>
      
      <h2 className="project-title">{project.name}</h2>
      
      <div className="problem-summary">
        <strong>Problem:</strong> {project.problemSummary || 'No problem statement defined'}
      </div>
      
      <div className="categories-preview">
        {Object.entries(project.categories).slice(0, 4).map(([cat, files]) => (
          <span key={cat} className="category-pill">
            {cat} <span className="count">{files.length}</span>
          </span>
        ))}
        {Object.keys(project.categories).length > 4 && (
          <span className="category-pill more">+{Object.keys(project.categories).length - 4} more</span>
        )}
      </div>
      
      <div className="card-footer">
        <span className="view-detail">View Details →</span>
      </div>
    </article>
  )
}

const ProjectDetail = ({ project, activeTab, setActiveTab, onBack }) => {
  const [fileContents, setFileContents] = useState({})
  const [loadingFiles, setLoadingFiles] = useState(new Set())

  const tabs = [
    { id: 'problem', label: 'Problem Statement', icon: '📋' },
    { id: 'decisions', label: 'Architecture Decisions', icon: '🏗️' },
    { id: 'design', label: 'Solution Design', icon: '🎨' },
    { id: 'delivery', label: 'Delivery & DevOps', icon: '🚀' },
    { id: 'operations', label: 'Operations', icon: '📊' },
    { id: 'reports', label: 'Reports', icon: '📄' },
    { id: 'all', label: 'All Files', icon: '📁' }
  ]

  const loadCategoryFiles = async (category) => {
    const files = project.files.filter(f => f.category === category)
    const newLoading = new Set(loadingFiles)
    files.forEach(f => newLoading.add(f.path))
    setLoadingFiles(newLoading)

    const contents = {}
    for (const file of files) {
      try {
        const response = await fetch(`/${file.path}`)
        contents[file.name] = await response.text()
      } catch {
        contents[file.name] = 'Failed to load'
      }
    }
    
    setFileContents(prev => ({ ...prev, ...contents }))
    files.forEach(f => {
      const nextLoading = new Set(loadingFiles)
      nextLoading.delete(f.path)
      setLoadingFiles(nextLoading)
    })
  }

  useEffect(() => {
    if (activeTab !== 'problem' && activeTab !== 'all') {
      const categoryMap = {
        decisions: 'Architecture Decisions',
        design: 'Solution Design',
        delivery: 'Delivery & DevOps',
        operations: 'Operations',
        reports: 'Architecture Reports'
      }
      loadCategoryFiles(categoryMap[activeTab])
    }
  }, [activeTab])

  const getTabFiles = () => {
    if (activeTab === 'all') return project.files
    if (activeTab === 'problem') return project.files.filter(f => f.category === 'Problem Statement')
    
    const categoryMap = {
      decisions: 'Architecture Decisions',
      design: 'Solution Design',
      delivery: 'Delivery & DevOps',
      operations: 'Operations',
      reports: 'Architecture Reports'
    }
    return project.files.filter(f => f.category === categoryMap[activeTab])
  }

  const renderMarkdown = (content) => {
    // Simple markdown rendering for display
    return content
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em>$1</em>')
      .replace(/`(.*?)`/gim, '<code>$1</code>')
      .replace(/^- (.*$)/gim, '<li>$1</li>')
      .replace(/\n/gim, '<br/>')
  }

  return (
    <div className="detail-view">
      <button className="back-btn" onClick={onBack}>← Back to Projects</button>
      
      <header className="detail-header">
        <h1>{project.name}</h1>
        <div className="detail-meta">
          <span>{project.fileCount} files</span>
          <span>{Object.keys(project.categories).length} categories</span>
        </div>
      </header>

      <nav className="tabs" role="tablist">
        {tabs.filter(t => {
          if (t.id === 'all') return true
          if (t.id === 'problem') return project.files.some(f => f.category === 'Problem Statement')
          const categoryMap = {
            decisions: 'Architecture Decisions',
            design: 'Solution Design',
            delivery: 'Delivery & DevOps',
            operations: 'Operations',
            reports: 'Architecture Reports'
          }
          return project.files.some(f => f.category === categoryMap[t.id])
        }).map(tab => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>

      <div className="detail-content" role="tabpanel">
        {activeTab === 'problem' && (
          <ProblemStatement 
            content={project.problemContent} 
            fileName={project.problemFile}
          />
        )}

        {activeTab !== 'problem' && activeTab !== 'all' && (
          <CategoryView 
            files={getTabFiles()} 
            fileContents={fileContents}
            loadingFiles={loadingFiles}
            renderMarkdown={renderMarkdown}
          />
        )}

        {activeTab === 'all' && (
          <AllFilesView 
            files={project.files} 
            fileContents={fileContents}
            loadingFiles={loadingFiles}
            renderMarkdown={renderMarkdown}
          />
        )}
      </div>
    </div>
  )
}

const ProblemStatement = ({ content, fileName }) => (
  <article className="problem-statement">
    <header>
      <h2>Customer Problem Statement</h2>
      <span className="source-file">Source: {fileName}</span>
    </header>
    <div className="markdown-content" dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br/>') }} />
  </article>
)

const CategoryView = ({ files, fileContents, loadingFiles, renderMarkdown }) => (
  <div className="category-view">
    {files.length === 0 ? (
      <div className="empty-state">No files in this category</div>
    ) : (
      <div className="file-list">
        {files.map(file => (
          <FileSection 
            key={file.path} 
            file={file} 
            content={fileContents[file.name]}
            isLoading={loadingFiles.has(file.path)}
            renderMarkdown={renderMarkdown}
          />
        ))}
      </div>
    )}
  </div>
)

const AllFilesView = ({ files, fileContents, loadingFiles, renderMarkdown }) => (
  <div className="category-view">
    <div className="file-tree">
      {Object.entries(
        files.reduce((acc, file) => {
          if (!acc[file.category]) acc[file.category] = []
          acc[file.category].push(file)
          return acc
        }, {})
      ).map(([category, catFiles]) => (
        <details key={category} className="category-section" defaultOpen>
          <summary>{category} ({catFiles.length})</summary>
          <div className="file-list">
            {catFiles.map(file => (
              <FileSection 
                key={file.path} 
                file={file} 
                content={fileContents[file.name]}
                isLoading={loadingFiles.has(file.path)}
                renderMarkdown={renderMarkdown}
              />
            ))}
          </div>
        </details>
      ))}
    </div>
  </div>
)

const FileSection = ({ file, content, isLoading, renderMarkdown }) => (
  <section className="file-section">
    <header className="file-header">
      <h3>{file.name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</h3>
      <span className="file-path">{file.path}</span>
    </header>
    <div className="file-content">
      {isLoading ? (
        <div className="loading-inline">Loading...</div>
      ) : content ? (
        <div className="markdown-content" dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }} />
      ) : (
        <button 
          className="load-btn" 
          onClick={() => window.dispatchEvent(new CustomEvent('load-file', { detail: file.path }))}
        >
          Load Content
        </button>
      )}
    </div>
  </section>
)

export default App