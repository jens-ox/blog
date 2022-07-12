import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import { PropsWithChildren } from 'react'
import cx from 'classnames'

interface NavLinkProps extends LinkProps {
  text: string
}

const NavLink: React.FC<PropsWithChildren<NavLinkProps>> = ({ href, text, ...linkProps }) => {
  const router = useRouter()

  return (
    <Link href={href}>
      <a
        className={cx(
          'relative rounded-full px-4 py-1 transition duration-100',
          router.asPath === href
            ? 'font-bold cursor-default'
            : 'hover:bg-stone-200 dark:hover:bg-stone-700 cursor-pointer'
        )}
        {...linkProps}
      >
        <span className="font-bold opacity-0" aria-hidden={true}>
          {text}
        </span>
        <div className="absolute w-full h-full top-0 left-0 flex items-center justify-center">
          <span className={cx(router.asPath === href ? 'font-bold' : 'font-normal')}>{text}</span>
        </div>
      </a>
    </Link>
  )
}

export default NavLink
