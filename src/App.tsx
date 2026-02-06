import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { ToastProvider } from '@/components/ui/Toast'
import { Dashboard } from '@/pages/Dashboard'
import { Config } from '@/pages/Config'
import { Memory } from '@/pages/Memory'
import { Prompts } from '@/pages/Prompts'
import { Skills } from '@/pages/Skills'
import { Projects } from '@/pages/Projects'
import { Output } from '@/pages/Output'
import { Cron } from '@/pages/Cron'
import { Sessions } from '@/pages/Sessions'
import { Settings } from '@/pages/Settings'

export default function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="config" element={<Config />} />
            <Route path="memory" element={<Memory />} />
            <Route path="prompts" element={<Prompts />} />
            <Route path="skills" element={<Skills />} />
            <Route path="projects" element={<Projects />} />
            <Route path="output" element={<Output />} />
            <Route path="cron" element={<Cron />} />
            <Route path="sessions" element={<Sessions />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  )
}
