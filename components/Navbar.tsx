import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from 'lucide-react'
import Link from 'next/link'
import { Fragment } from 'react'
import NavLink from './NavLink'

const links = [
  {
    href: '/',
    text: 'Home'
  },
  {
    href: '/projects',
    text: 'Projects'
  },
  {
    href: '/blog',
    text: 'Blog'
  },
  {
    href: '/uni',
    text: 'University'
  }
]

export const NavBar = () => (
  <Popover>
    <nav className="container mx-auto px-4 py-6 text-sm">
      <div className="flex flex-1 items-center md:absolute md:inset-y-0 md:left-0">
        <div className="flex w-full items-center justify-end md:w-auto">
          <div className="flex items-center md:hidden">
            <Popover.Button className="inline-flex items-center justify-center rounded-md p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open main menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
        </div>
      </div>
      <div className="hidden md:flex md:space-x-10">
        {links.map((item) => (
          <NavLink key={item.text} href={item.href} text={item.text} />
        ))}
      </div>
    </nav>

    <Transition
      as={Fragment}
      enter="duration-150 ease-out"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="duration-100 ease-in"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <Popover.Panel focus className="absolute inset-x-0 top-0 z-10 origin-top-right p-2 transition md:hidden">
        <div className="overflow-hidden rounded-lg bg-white p-4 shadow-md ring-1 ring-black/5">
          <div className="flex items-center justify-end">
            <div>
              <Popover.Button className="inline-flex items-center justify-center rounded-md p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span className="sr-only">Close menu</span>
                <XIcon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
          </div>
          <div>
            {links.map((item) => (
              <Popover.Button as={Link} key={`mobile-${item.text}`} href={item.href}>
                <span className="block cursor-pointer rounded-md px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900">
                  {item.text}
                </span>
              </Popover.Button>
            ))}
          </div>
        </div>
      </Popover.Panel>
    </Transition>
  </Popover>
)
