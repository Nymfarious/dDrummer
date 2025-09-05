# DrumScript Studio - Lovable.ai Project

## 🚀 Project Overview
Professional drum transcription and practice tool built for Lovable.ai deployment with Supabase backend.

## 📁 Project Structure for Lovable

```
drumscript-studio/
├── src/
│   ├── components/
│   │   ├── AudioPanel.tsx
│   │   ├── MetronomePanel.tsx
│   │   ├── PDFPanel.tsx
│   │   ├── VideoPanel.tsx
│   │   └── Layout/
│   │       ├── Header.tsx
│   │       └── StatusBar.tsx
│   ├── hooks/
│   │   ├── useAudio.ts
│   │   ├── useMetronome.ts
│   │   └── usePanelState.ts
│   ├── lib/
│   │   ├── metronome.ts
│   │   ├── audioUtils.ts
│   │   └── supabase.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   └── main.tsx
├── public/
├── package.json
└── README.md
```

## 🎯 Core Features to Implement

### Phase 1: Core Functionality
- ✅ Collapsible panel system
- ✅ Audio playback with speed control
- ✅ Advanced metronome (12/8, compound time signatures)
- ✅ PDF viewer with navigation
- ✅ Video player integration
- ✅ Drag & drop file handling

### Phase 2: Supabase Integration
- 📊 User authentication
- 💾 Save/load transcription projects
- ☁️ Cloud file storage
- 👥 Share projects with bandmates
- 📈 Practice session tracking

### Phase 3: Advanced Features
- 🎼 Notation editor integration
- 🔊 Beat detection from audio
- 📱 Mobile app (PWA)
- 🎵 MuseScore API integration

## 📦 Dependencies

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "typescript": "^5.0.0",
    "@supabase/supabase-js": "^2.38.0",
    "tone": "^14.8.49",
    "lucide-react": "^0.263.1",
    "tailwindcss": "^3.3.0",
    "react-router-dom": "^6.8.0",
    "zustand": "^4.4.0",
    "react-dropzone": "^14.2.0"
  }
}
```

## 🎨 Main App Component Structure

```typescript
// src/App.tsx
import React from 'react';
import { Header } from './components/Layout/Header';
import { AudioPanel } from './components/AudioPanel';
import { MetronomePanel } from './components/MetronomePanel';
import { PDFPanel } from './components/PDFPanel';
import { VideoPanel } from './components/VideoPanel';
import { StatusBar } from './components/Layout/StatusBar';
import { usePanelState } from './hooks/usePanelState';

function App() {
  const { activePanel, setActivePanel } = usePanelState();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900">
      <Header />
      <div className="flex flex-col gap-4 p-4">
        <AudioPanel 
          isActive={activePanel === 'audio'} 
          onToggle={() => setActivePanel('audio')} 
        />
        <MetronomePanel 
          isActive={activePanel === 'metronome'} 
          onToggle={() => setActivePanel('metronome')} 
        />
        <PDFPanel 
          isActive={activePanel === 'pdf'} 
          onToggle={() => setActivePanel('pdf')} 
        />
        <VideoPanel 
          isActive={activePanel === 'video'} 
          onToggle={() => setActivePanel('video')} 
        />
      </div>
      <StatusBar />
    </div>
  );
}

export default App;
```

## 🎵 Metronome Hook Example

```typescript
// src/hooks/useMetronome.ts
import { useState, useCallback } from 'react';
import * as Tone from 'tone';

interface TimeSignature {
  numerator: number;
  denominator: number;
  name: string;
}

export const useMetronome = () => {
  const [tempo, setTempo] = useState(120);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(1);
  const [timeSignature, setTimeSignature] = useState<TimeSignature>({
    numerator: 4,
    denominator: 4,
    name: 'Common Time'
  });

  const timeSignatures: TimeSignature[] = [
    { numerator: 4, denominator: 4, name: 'Common Time' },
    { numerator: 3, denominator: 4, name: 'Waltz Time' },
    { numerator: 6, denominator: 8, name: 'Compound Duple' },
    { numerator: 12, denominator: 8, name: 'Compound Quadruple' },
    // ... more time signatures
  ];

  const start = useCallback(async () => {
    await Tone.start();
    // Metronome logic here
    setIsPlaying(true);
  }, [tempo, timeSignature]);

  const stop = useCallback(() => {
    setIsPlaying(false);
    setCurrentBeat(1);
  }, []);

  return {
    tempo,
    setTempo,
    isPlaying,
    currentBeat,
    timeSignature,
    setTimeSignature,
    timeSignatures,
    start,
    stop
  };
};
```

## 🗄️ Supabase Schema

```sql
-- Users table (handled by Supabase Auth)

-- Projects table
CREATE TABLE projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Project files table
CREATE TABLE project_files (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID REFERENCES projects(id),
    file_name TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Practice sessions table
CREATE TABLE practice_sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID REFERENCES projects(id),
    duration INTEGER, -- in seconds
    tempo INTEGER,
    time_signature TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🚀 Deployment Steps for Lovable

1. **Create New Lovable Project:**
   ```bash
   # Go to lovable.ai
   # Click "Create New Project"
   # Choose "React + Supabase" template
   ```

2. **Set Up Environment Variables:**
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Configure Supabase:**
   - Enable Authentication
   - Set up file storage buckets
   - Run the SQL schema above
   - Configure Row Level Security (RLS)

4. **Deploy via Lovable:**
   - Lovable automatically handles GitHub integration
   - Pushes to Supabase Edge Functions
   - Sets up CI/CD pipeline

## 🎯 Immediate Next Steps

1. **Start with Lovable Template:**
   - Use their React + Supabase starter
   - Import the UI components we built
   
2. **Convert HTML to React Components:**
   - Break down the panels into reusable components
   - Add TypeScript interfaces
   - Implement proper state management

3. **Add Supabase Integration:**
   - User authentication
   - File storage for audio/PDF/video files
   - Project saving/loading

4. **Progressive Enhancement:**
   - Start with core functionality
   - Add advanced features incrementally
   - Test with your actual West Texas band files

## 📱 Mobile Considerations

- PWA configuration for mobile use
- Touch-friendly controls for metronome
- Responsive design for small screens
- Offline capability for practice sessions

## 🔗 Integration Points

- **MuseScore API** for notation editing
- **Web Audio API** for advanced audio analysis
- **PDF.js** for better PDF handling
- **File System Access API** for local file management

This structure gives you a solid foundation for Lovable deployment while maintaining all the professional features you need for drum transcription work!
