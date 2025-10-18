import './App.css'

interface Tool {
  name: string
  description: string
  repo: string
  codespacesUrl: string
}

const tools: Tool[] = [
  {
    name: 'Rhythm Studio',
    description: 'Tool for creating and editing drum patterns and rhythms',
    repo: 'Nymfarious/ddrummer-rhythm-studio',
    codespacesUrl: 'https://github.com/codespaces/new?repo=Nymfarious/ddrummer-rhythm-studio'
  },
  {
    name: 'Drum Hub',
    description: 'Central hub for drum resources, samples, and tools',
    repo: 'Nymfarious/drum-hub',
    codespacesUrl: 'https://github.com/codespaces/new?repo=Nymfarious/drum-hub'
  },
  {
    name: 'Drummer-to-Midi Pipeline',
    description: 'Convert drum performances to MIDI format',
    repo: 'Nymfarious/Drummer-to-Midi-Pipeline',
    codespacesUrl: 'https://github.com/codespaces/new?repo=Nymfarious/Drummer-to-Midi-Pipeline'
  },
  {
    name: 'dDrummer',
    description: 'Umbrella repository hosting the devtools dashboard',
    repo: 'Nymfarious/dDrummer',
    codespacesUrl: 'https://github.com/codespaces/new?repo=Nymfarious/dDrummer'
  }
]

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>🥁 dDrummer Devtools Dashboard</h1>
        <p className="subtitle">Your command center for dDrummer development tools</p>
      </header>

      <main className="main">
        <div className="tools-grid">
          {tools.map((tool) => (
            <div key={tool.repo} className="tool-card">
              <h2 className="tool-name">{tool.name}</h2>
              <p className="tool-description">{tool.description}</p>
              <div className="tool-actions">
                <a 
                  href={`https://github.com/${tool.repo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  View Repository
                </a>
                <a 
                  href={tool.codespacesUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Open in Codespaces
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="footer">
        <p>Built with React + TypeScript + Vite</p>
      </footer>
    </div>
  )
}

export default App
