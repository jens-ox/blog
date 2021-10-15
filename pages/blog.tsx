import { getAllFilesFrontMatter } from '@/lib/mdx'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { PageSEO } from '@/components/SEO'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { ComponentProps } from 'react'

export const POSTS_PER_PAGE = 5

export const getStaticProps: GetStaticProps<{
  posts: ComponentProps<typeof ListLayout>['posts']
  initialDisplayPosts: ComponentProps<typeof ListLayout>['initialDisplayPosts']
}> = async () => {
  const posts = await getAllFilesFrontMatter('blog')
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)

  return { props: { initialDisplayPosts, posts } }
}

export default function Blog({
  posts,
  initialDisplayPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO title={`Blog - ${siteMetadata.author}`} description={siteMetadata.description} />
      <ListLayout posts={posts} initialDisplayPosts={initialDisplayPosts} title="All Posts" />
    </>
  )
}
