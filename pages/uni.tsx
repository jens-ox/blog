import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { getFileBySlug } from '@/lib/mdx'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { GenericFrontMatter } from 'types/GenericFrontMatter'

// @ts-ignore
export const getStaticProps: GetStaticProps<{
  mdxSource: string
  frontMatter: GenericFrontMatter
}> = async () => {
  const uniPage = await getFileBySlug('pages', ['uni'])
  const { mdxSource, frontMatter } = uniPage
  return { props: { mdxSource, frontMatter } }
}

export default function About({
  mdxSource,
  frontMatter,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <MDXLayoutRenderer layout="StaticPage" mdxSource={mdxSource} frontMatter={frontMatter} />
}
