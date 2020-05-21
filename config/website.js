module.exports = {
    pathPrefix: '/', // Prefix for all links. If you deploy your site to example.com/portfolio your pathPrefix should be "portfolio"
    title: `WESLEY SEQUEIRA`, // Navigation and Site Title
    titleAlt: `Wesley`, // Title for JSONLD
    description: `Just a simple webpage to showcase my interests!`,
    headline: `Wesley's portfolio`, // Headline for schema.org JSONLD
    url: `https://wesleysequeira.com`, // Domain of your site. No trailing slash!
    siteLanguage: `en`, // Language Tag on <html> element
    image: `/logos/me.jpg`, // Used for SEO
    ogLanguage: `en_US`, // Facebook Language
  
    // JSONLD / Manifest
    favicon: 'src/images/favicon.png', // Used for manifest favicon generation
    shortName: `Wesley`, // shortname for manifest. MUST be shorter than 12 characters
    author: `Wesley Sequeira`, // Author for schemaORGJSONLD
    themeColor: `#FFFFFF`,
    backgroundColor: `#000000`,
  }