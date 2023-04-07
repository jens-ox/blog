import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from 'lucide-react'
import Link from 'next/link'
import { Fragment } from 'react'

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
    <div className="container mx-auto p-6">
      <nav className="flex justify-center" aria-label="Global">
        <div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
          <div className="flex items-center justify-end w-full md:w-auto">
            <div className="flex items-center md:hidden">
              <Popover.Button className="rounded-md p-2 inline-flex items-center justify-center text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span className="sr-only">Open main menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
          </div>
        </div>
        <div className="hidden md:flex md:space-x-10">
          {links.map((item) => (
            <Link key={item.text} href={item.href}>
              <span className="font-medium text-slate-500 hover:text-slate-900 cursor-pointer">{item.text}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>

    <Transition
      as={Fragment}
      enter="duration-150 ease-out"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="duration-100 ease-in"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <Popover.Panel
        focus
        className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
      >
        <div className="bg-white rounded-lg shadow-md ring-1 ring-black ring-opacity-5 overflow-hidden p-4">
          <div className="flex items-center justify-end">
            <div>
              <Popover.Button className="rounded-md p-2 inline-flex items-center justify-center text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span className="sr-only">Close menu</span>
                <XIcon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
          </div>
          <div>
            {links.map((item) => (
              <Popover.Button as={Link} key={`mobile-${item.text}`} href={item.href}>
                <span className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 cursor-pointer">
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
