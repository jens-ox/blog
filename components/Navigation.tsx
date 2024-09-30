'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const Navigation = () => {
  const pathname = usePathname()

  return (
    <div className="flex gap-2 bg-white dark:bg-gray-100/10 rounded-lg p-1 border border-gray-200 dark:border-gray-100/50">
      <Link href="/" className="nav-link" data-active={pathname === '/'}>
        Resume
      </Link>
      <Link href="/projects" className="nav-link" data-active={pathname === '/projects'}>
        Projects
      </Link>
    </div>
  )
}
