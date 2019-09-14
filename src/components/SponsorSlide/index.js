import React from 'react'
import classnames from 'classnames'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

const SponsorImage = ({ image, className = '' }) => (
  <StaticQuery
    query={graphql`
      query sponsorSlideQuery {
        source: allFile(
          filter: { absolutePath: { regex: "/static/sponsor-slide/" } }
        ) {
          edges {
            node {
              childImageSharp {
                fluid(maxWidth: 1920) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    `}
    render={data => {
      return data.source.edges
        .filter(({ node }) => {
          const { src } = node.childImageSharp.fluid
          return src.includes(image)
        })
        .map(({ node }, i) => (
          <Img
            className={classnames('sponsor-slide', className)}
            fluid={node.childImageSharp.fluid}
            key={image}
          />
        ))
    }}
  />
)
export default SponsorImage
