module.exports = {
  siteMetadata: {
    siteUrl: 'http://visual.jsconfbp.com',
    title: 'Visual 2019',
    description: '',
    keywords: '',
    twitter: '@jsconfbp'
  },
  plugins: [
    'gatsby-plugin-sass',
    {
      resolve:`gatsby-source-filesystem`,
      options:{
        name:`sponsor-images`,
        path: `${__dirname}/static/sponsors`,
        ignore: [ `**/\.*` ], // ignore files starting with a dot
      }
    },
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
