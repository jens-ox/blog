import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import { ReactNode } from 'react'
import { GenericFrontMatter } from 'types/GenericFrontMatter'

interface Props {
  frontMatter: GenericFrontMatter
  children: ReactNode
  next?: { slug: string; title: string }
  prev?: { slug: string; title: string }
}

export default function PostLayout({ frontMatter, next, prev, children }: Props) {
  const { title } = frontMatter

  return (
    <SectionContainer>
      <article>
        <div>
          <header>
            <div className="pb-10 space-y-1 text-center border-b border-gray-200 dark:border-gray-700">
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
            </div>
          </header>
          <div
            className="pb-8 divide-y divide-gray-200 xl:divide-y-0 dark:divide-gray-700 "
            style={{ gridTemplateRows: 'auto 1fr' }}
          >
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:pb-0 xl:col-span-3 xl:row-span-2">
              <div className="pt-10 pb-8 prose dark:prose-dark max-w-none">{children}</div>
            </div>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
