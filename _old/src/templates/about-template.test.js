import React from 'react'
import renderer from 'react-test-renderer'
import { StaticQuery, useStaticQuery } from 'gatsby'
import AboutTemplate from './about-template'
import siteMetadata from '../../jest/__fixtures__/site-metadata'
import allMarkdownRemark from '../../jest/__fixtures__/all-markdown-remark'
import pageContext from '../../jest/__fixtures__/page-context'

describe('AboutTemplate', () => {
  const props = {
    data: {
      ...allMarkdownRemark,
    },
    ...pageContext,
  }

  beforeEach(() => {
    StaticQuery.mockImplementationOnce(
      ({ render }) => render(siteMetadata),
      useStaticQuery.mockReturnValue(siteMetadata)
    )
  })

  it('renders correctly', () => {
    const tree = renderer.create(<AboutTemplate {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
