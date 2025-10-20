import { useState } from 'react'

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
  const [isDark, setIsDark] = useState(false)

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-8 text-center bg-gradient-to-br from-primary to-purple-700 text-white">
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
          >
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-2">
          🥁 dDrummer Devtools Dashboard
        </h1>
        <p className="text-lg md:text-xl opacity-90">
          Your command center for dDrummer development tools
        </p>
      </header>

      <main className="flex-1 p-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {tools.map((tool) => (
            <div
              key={tool.repo}
              className="bg-card border border-border rounded-xl p-6 transition-all hover:-translate-y-1 hover:shadow-lg hover:border-primary"
            >
              <h2 className="text-2xl font-semibold mb-3 text-card-foreground">
                {tool.name}
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed min-h-[3rem]">
                {tool.description}
              </p>
              <div className="flex gap-3 flex-wrap">
                <a
                  href={`https://github.com/${tool.repo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-md text-sm font-medium bg-secondary text-secondary-foreground border border-border hover:bg-secondary/80 transition-colors"
                >
                  View Repository
                </a>
                <a
                  href={tool.codespacesUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-md text-sm font-medium bg-gradient-to-br from-primary to-purple-700 text-primary-foreground hover:scale-105 hover:shadow-lg transition-all"
                >
                  Open in Codespaces
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="p-6 text-center bg-card border-t border-border text-muted-foreground text-sm">
        <p>Built with React + TypeScript + Vite + Tailwind CSS</p>
      </footer>
    </div>
  )
}

export default App
