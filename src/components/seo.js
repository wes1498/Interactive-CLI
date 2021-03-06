/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({
  description,
  lang,
  meta,
  title,
  image,
  pathname,
  article,
  node
}) {
  const { site } = useStaticQuery(query)

  const {
    buildTime,
    siteMetadata: {
      defaultTitle,
      defaultDescription,
      defaultImage,
      siteUrl,
      author,
      headline,
      siteLanguage,
      ogLanguage,
    },
  } = site

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image || defaultImage}`,
    url: `${siteUrl}${pathname}`,
  }

  // const image = `${site.siteMetadata.siteUrl}${
  //   metaImage.src || site.siteMetadata.image
  // }`

  const canonical = pathname ? `${site.siteMetadata.siteUrl}${pathname}` : null

  // schema.org in JSONLD format
  // https://developers.google.com/search/docs/guides/intro-structured-data
  // You can fill out the 'author', 'creator' with more data or another type (e.g. 'Organization')

  const schemaOrgWebPage = {
    "@context": "http://schema.org",
    "@type": "WebPage",
    url: siteUrl,
    headline,
    inLanguage: siteLanguage,
    mainEntityOfPage: siteUrl,
    description: defaultDescription,
    name: defaultTitle,
    author: {
      "@type": "Person",
      name: author,
    },
    copyrightHolder: {
      "@type": "Person",
      name: author,
    },
    copyrightYear: "2020",
    creator: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Person",
      name: author,
    },
    datePublished: "2020-05-20T12:30:00+01:00",
    dateModified: buildTime,
    image: {
      "@type": "ImageObject",
      url: `${siteUrl}${image}`,
    },
  }
  // Initial breadcrumb list

  const itemListElement = [
    {
      "@type": "ListItem",
      item: {
        "@id": siteUrl,
        name: "Homepage",
      },
      position: 1,
    },
  ]
  let schemaArticle = null

  if (article) {
    schemaArticle = {
      '@context': 'http://schema.org',
      '@type': 'Article',
      author: {
        '@type': 'Person',
        name: author,
      },
      copyrightHolder: {
        '@type': 'Person',
        name: author,
      },
      copyrightYear: '2019',
      creator: {
        '@type': 'Person',
        name: author,
      },
      publisher: {
        '@type': 'Organization',
        name: author,
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}${defaultImage}`,
        },
      },
      datePublished: node.first_publication_date,
      dateModified: node.last_publication_date,
      description: seo.description,
      headline: seo.title,
      inLanguage: siteLanguage,
      url: seo.url,
      name: seo.title,
      image: {
        '@type': 'ImageObject',
        url: seo.image,
      },
      mainEntityOfPage: seo.url,
    }
    // Push current blogpost into breadcrumb list
    itemListElement.push({
      '@type': 'ListItem',
      item: {
        '@id': seo.url,
        name: seo.title,
      },
      position: 2,
    })
  }

  const breadcrumb = {
    "@context": "http://schema.org",
    "@type": "BreadcrumbList",
    description: "Breadcrumbs list",
    name: "Breadcrumbs",
    itemListElement,
  }

  return (
    <Helmet title={seo.title}>
    <html lang={siteLanguage} />
    <meta name="description" content={seo.description} />
    <meta name="image" content={seo.image} />
    <meta name="gatsby-starter" content="Gatsby Starter Prismic" />
    {/* Insert schema.org data conditionally (webpage/article) + everytime (breadcrumbs) */}
    {!article && <script type="application/ld+json">{JSON.stringify(schemaOrgWebPage)}</script>}
    {article && <script type="application/ld+json">{JSON.stringify(schemaArticle)}</script>}
    <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
  </Helmet>
    // <Helmet
    //   htmlAttributes={{
    //     lang,
    //   }}
    //   title={title}
    //   titleTemplate={`%s | ${site.siteMetadata.siteUrl}`}
    //   link={
    //     canonical
    //       ? [
    //           {
    //             rel: "canonical",
    //             href: canonical,
    //           },
    //         ]
    //       : []
    //   }
    //   meta={[
    //     {
    //       name: `description`,
    //       content: seo.description,
    //     },
    //     {
    //       name:  `og:image`,
    //       conten: seo.image
    //     },
    //     {
    //       property: `og:description`,
    //       content: seo.description,
    //     },
    //     {
    //       property: `og:type`,
    //       content: `website`,
    //     },
    //     {
    //       property: `og:title`,
    //       content: title,
    //     },
    //     {
    //       name: `twitter:creator`,
    //       content: author,
    //     },
    //     {
    //       name: `twitter:title`,
    //       content: title,
    //     },
    //     {
    //       name: `twitter:description`,
    //       content: seo.description,
    //     },
    //   ]
    //     // .concat(
    //     //   metaImage
    //     //     ? [
    //     //         {
    //     //           property: "og:image",
    //     //           content: image,
    //     //         },
    //     //         {
    //     //           property: "og:image:width",
    //     //           content: metaImage.width,
    //     //         },
    //     //         {
    //     //           property: "og:image:height",
    //     //           content: metaImage.height,
    //     //         },
    //     //         {
    //     //           name: "twitter:card",
    //     //           content: "summary_large_image",
    //     //         },
    //     //       ]
    //     //     : [
    //     //         {
    //     //           name: "twitter:card",
    //     //           content: "summary",
    //     //         },
    //     //       ]
    //     // )
    //     .concat(meta)}
    // >
    //   <script type="application/ld+json">
    //     {JSON.stringify(schemaOrgWebPage)}
    //   </script>
    //   <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
    // </Helmet>
  )
}

export default SEO

SEO.defaultProps = {
  description: ``,
  lang: `en`,
  meta: [],
  title: ``,
  image: null,
  pathname: null,
  headline: ``,
  article: false,
  node: null,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  image: PropTypes.shape({
    src: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  }),
  pathname: PropTypes.string,
  headline: PropTypes.string,
  article: PropTypes.bool,
  node: PropTypes.object,
}

const query = graphql`
  query {
    site {
      buildTime(formatString: "YYYY-MM-DD")
      siteMetadata {
        defaultTitle: title
        defaultDescription: description
        defaultImage: image
        siteUrl: url
        author
        headline
        siteLanguage
        ogLanguage
      }
    }
  }
`
