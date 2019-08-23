module.exports = {
  siteMetadata: {
    siteUrl: 'http://2015.jsconfbp.com/visual-2019/',
    title: 'Visual 2019',
    description: '',
    keywords: '',
    twitter: '@jsconfbp'
  },
  pathPrefix: `/visual-2019`,
  plugins: [
    'gatsby-plugin-sass',
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
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
          rule: {
            include: `${__dirname}/src/images`,
          }
      }
    },
  ],
}
