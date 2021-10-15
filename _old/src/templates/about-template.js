import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Sidebar from '../components/Sidebar'
import Page from '../components/Page'
import { useSiteMetadata } from '../hooks'

const AboutTemplate = ({ data }) => {
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata()
  const { html: pageBody } = data.markdownRemark
  const { frontmatter } = data.markdownRemark
  const { title: pageTitle, description: pageDescription, socialImage } = frontmatter
  const metaDescription = pageDescription !== null ? pageDescription : siteSubtitle

  return (
    <Layout
      title={`${pageTitle} - ${siteTitle}`}
      description={metaDescription}
      socialImage={socialImage}
    >
      <Sidebar />
      <Page title={pageTitle}>
        <div dangerouslySetInnerHTML={{ __html: pageBody }} />
      </Page>
    </Layout>
  )
}

export const query = graphql`
  query AboutPage {
    markdownRemark(fields: { slug: { eq: "/pages/about" } }) {
      id
      html
      frontmatter {
        title
        date
        description
        socialImage
      }
    }
  }
`

export default AboutTemplate
