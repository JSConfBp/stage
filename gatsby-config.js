module.exports = {
  siteMetadata: {
    siteUrl: 'http://stage.jsconfbp.com',
    title: 'Stage 2022',
    description: '',
    keywords: '',
    twitter: '@jsconfbp'
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /\.inline\.svg$/
        }
      }
    },
    'gatsby-plugin-sass',
    {
      resolve:`gatsby-source-filesystem`,
      options:{
        name:`sponsor-slides`,
        path: `${__dirname}/static/sponsor-slide`,
        ignore: [ `**/\.*` ], // ignore files starting with a dot
      }
    },
    {
      resolve:`gatsby-source-filesystem`,
      options:{
        name:`speaker-images`,
        path: `${__dirname}/speakers`,
        ignore: [ `**/\.*` ], // ignore files starting with a dot
      }
    },
    'gatsby-plugin-force-trailing-slashes',
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    
  ],
}
