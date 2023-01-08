import Link from 'next/link'
import { useState } from 'react'

const posts = [
  {
    title: 'UI component sharing for enterprises',
    date: '2022-05-19',
    slug: 'enterprise-ui-components',
    summary: 'How to properly set up a React UI component library and share it across your organization.'
  },
  {
    title: 'modern frontend principles',
    date: '2021-10-15',
    slug: 'modern-frontend-principles',
    summary:
      'Guidelines for bringing a legacy frontend codebase up to speed in terms of maintainability and best practices.'
  },
  {
    title: 'quick static websites for small businesses',
    date: '2020-11-23',
    slug: 'quick-websites',
    summary:
      "During the Coronavirus pandemic, several local businesses contacted me and asked if I could help set them up with  a nice website. As requests were usually quite custom, an off-the-shelf WordPress site would've become a struggle, so I decided to go for a more robust setup. This post describes the process."
  },
  {
    title: 'gaining control over personal finances',
    date: '2020-09-14',
    slug: 'clean-personal-finances',
    summary:
      'The fact that absolutely nothing is taught in school regarding personal finances always bugged me, as I consider having control over and a long-term strategy for your own money to be one of the really important things when starting to work in your first full-time position. This post outlines my pain points with existing personal finance budgeting tools and proposes a more flow-based approach to it.'
  },
  {
    title: 'documenting things in a large-scale enterprise context',
    date: '2020-07-31',
    slug: 'enterprise-documentation',
    summary:
      "It's well known that good documentation is just as important as the actual code. In enterprise environments, writing good documentation is often hard - versioned docs are spread across lots of repos, centralized docs are rotting away in Confluence. In this post, I want to propose a solution for centralized documentation in multi-repo enterprise environments."
  }
]

export default function Blog() {
  const [searchValue, setSearchValue] = useState('')
  const filteredBlogPosts = posts.filter((frontMatter) => {
    const searchContent = frontMatter.title + frontMatter.summary
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  const displayPosts = !searchValue ? posts : filteredBlogPosts

  return (
    <div className="not-prose">
      <div className="divide-y">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            All Posts
          </h1>
          <div className="relative max-w-lg">
            <input
              aria-label="Search posts"
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search posts"
              className="block w-full px-4 py-2 rounded-lg dark:bg-white/5 bg-black/5 focus:ring-1 dark:focus:ring-white/50 focus:ring-black/50 focus:outline-none"
            />
            <svg
              className="absolute w-5 h-5 text-gray-400 right-3 top-3 dark:text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        {!filteredBlogPosts.length && 'No posts found.'}
        {displayPosts.map(({ slug, date, title, summary }) => {
          return (
            <div key={slug} className="py-4">
              <article className="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline">
                <dl>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>{date}</time>
                  </dd>
                </dl>
                <div className="space-y-3 xl:col-span-3">
                  <div>
                    <h3 className="text-2xl font-bold leading-8 tracking-tight">
                      <Link href={`/blog/${slug}`} className="text-gray-900 dark:text-gray-100 no-underline">
                        {title}
                      </Link>
                    </h3>
                  </div>
                  <div className="prose text-gray-500 max-w-none dark:text-gray-400">{summary}</div>
                </div>
              </article>
            </div>
          )
        })}
      </div>
    </div>
  )
}
