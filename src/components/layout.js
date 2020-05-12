/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */
import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div id="content">
      <section class="text">
        <Header siteTitle={data.site.siteMetadata.title} />
        <main>
          Hi, my name is Wesley! 

          I'm currently a fourth year student majoring in Business and Computer Science at the University of British Columbia.
          Growing up, I have had an avid interest in technology. My curiosity for tech motivated me to take intensive courses to better understand software programs as well as hardware elements. While my other hobbies include piano and basketball, my interest in technology pushes me to pursue personal projects. As the integration between business and technology industries grow exponentially, it is crucial for business leaders to maintain both a technological and qualitative mindset to remain a valuable competitor.
        </main>
        <main>
          For developers, please press ` on this page to open a terminal to navigate this website. If not or you're on mobile, click this paragraph and scroll down.
        </main>
      </section>    
      <footer>

      </footer>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
