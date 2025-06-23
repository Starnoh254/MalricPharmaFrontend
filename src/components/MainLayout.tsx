// src/components/MainLayout.tsx
import type { ReactNode } from 'react'
import Navbar from './Navbar' // import your nav

type Props = {
  children: ReactNode
}

export default function MainLayout({ children }: Props) {
  return (
    <div className="bg-background text-primary min-h-screen">
      <Navbar />
      <main className="px-4 py-6">{children}</main>
    </div>
  )
}
