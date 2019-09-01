import React from 'react'
import classnames from 'classnames'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

const SponsorImage = ({ image, className = '' }) => (
  <StaticQuery
    query={graphql`
      query sponsorImgQuery {
        source: allFile(
          filter: { absolutePath: { regex: "/static/sponsors/" } }
        ) {
          edges {
            node {
              childImageSharp {
                fluid(maxWidth: 800) {
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
            className={classnames('sponsor-image', className)}
            fluid={node.childImageSharp.fluid}
            key={image}
          />
        ))
    }}
  />
)
export default SponsorImage
