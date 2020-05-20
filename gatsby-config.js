const website = require("./config/website")

const pathPrefix = website.pathPrefix === "/" ? "" : website.pathPrefix

module.exports = {
  pathPrefix: website.pathPrefix,
  siteMetadata: {
    title: website.title,
    description: website.description,
    url: website.url,
    image: website.image,
    author: website.author,
    headline: website.headline,
    siteLanguage: website.siteLanguage,
    ogLanguage: website.ogLanguage,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: website.title,
        short_name: website.titleAlt,
        start_url: pathPrefix,
        background_color: website.backgroundColor,
        theme_color: website.themeColor,
        display: `standalone`,
        icon: website.favicon, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-netlify`,
  ],
}
