/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */
import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
import { fab } from "@fortawesome/free-brands-svg-icons"
import { faFileAlt } from "@fortawesome/free-solid-svg-icons"
import resume from "../Resume.pdf"

import Header from "./header"
import "./layout.css"

library.add(fab, faFileAlt)

const Layout = () => {
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
    <div className="content">
      <Header siteTitle={data.site.siteMetadata.title} />
      <main>
        I am currently a fourth year student majoring in Business and Computer
        Science at the University of British Columbia. Growing up, I have had an
        avid interest in technology. From tinkering with Lego blocks to creating
        a fully independent application, I have always been passionate about
        using my creative mindset to build innovative solutions.
      </main>
      <main>
        I have primarily worked with applications using .NET Famework with C#,
        VueJS, and ReactJS during my internship at RBC. My work with databases
        used T-SQL with Microsoft SQL Server, and the Entity Framework
        Repository Pattern. However, on the side I am working effortlessly on
        becoming a more experienced C++ developer.
      </main>
      <main>
        My other hobby includes playing the piano. What my peers viewed as
        dreadfully long practices, I saw as an opportunity to play the music I
        loved. My commitment to learning dramatically improved my piano skills,
        and placed me top three in the British Columbia Registered Music
        Teachers’ Association, and successfully completing Grade 9 for the Royal
        Conservatory of Music and Arts.
      </main>
      <main>
        As the integration between business and technology industries grow
        exponentially, it is crucial for business leaders to maintain both a
        technological and qualitative mindset to remain a valuable competitor.
      </main>
      <main>
        Please press ` on this page to open a terminal to navigate this website.
      </main>
      <footer>
        <br />
        <a
          href="https://www.linkedin.com/in/wesleysequeira/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={["fab", "linkedin"]} size="l" />
        </a>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <a
          href="https://github.com/wes1498"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={["fab", "github-square"]} size="l" />
        </a>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <a href={resume} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faFileAlt} size="l" />
        </a>
        <br/>
        <br/>
        <br/>
      </footer>
    </div>
  )
}

export default Layout
