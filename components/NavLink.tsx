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
      className={cx(isActive ? 'underline text-slate-900' : 'text-slate-600 hover:text-slate-800')}
      aria-current={isActive ? 'page' : undefined}
      {...linkProps}
    >
      {text}
    </Link>
  )
}

export default NavLink
