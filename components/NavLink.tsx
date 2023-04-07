import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import { PropsWithChildren } from 'react'
import cx from 'clsx'

interface NavLinkProps extends LinkProps {
  text: string
}

const NavLink: React.FC<PropsWithChildren<NavLinkProps>> = ({ href, text, ...linkProps }) => {
  const router = useRouter()

  const isActive = router.asPath === href

  return (
    <Link
      href={href}
      className={cx(
        isActive ? 'bg-slate-900 text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white',
        'rounded-md px-3 py-2 text-sm font-medium'
      )}
      aria-current={isActive ? 'page' : undefined}
      {...linkProps}
    >
      <span className="font-bold opacity-0" aria-hidden={true}>
        {text}
      </span>
      <div className="absolute w-full h-full top-0 left-0 flex items-center justify-center">
        <span className={cx(router.asPath === href ? 'font-bold' : 'font-normal')}>{text}</span>
      </div>
    </Link>
  )
}

export default NavLink
