import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'

export function Layout() {
  return (
    <div className="min-h-dvh bg-[var(--color-background)]">
      <Sidebar />
      <main className="ml-[var(--spacing-sidebar)] min-h-dvh">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
