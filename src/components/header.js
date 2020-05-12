import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import "./layout.css"

const Header = () => (
  <header>
      WESLEY SEQUEIRA
      <hr/>
      <h2>
        Software Developer
      </h2>
      <hr/>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: `hahaha`,
}

export default Header
