'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', name: 'Resume' },
  { href: '/projects', name: 'Projects' }
]

export const Navigation = () => {
  const pathname = usePathname()

  return (
    <div className="sticky pt-6 lg:pt-12 top-0 bg-gray-50 dark:bg-gray-800 print:hidden">
      <div className="flex gap-2 bg-white dark:bg-white/5 rounded-lg p-1 border border-gray-200 dark:border-gray-200/5 shadow-sm">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="nav-link" data-active={pathname === l.href}>
            {l.name}
          </Link>
        ))}
      </div>
    </div>
  )
}
