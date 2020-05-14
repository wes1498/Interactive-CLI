import PropTypes from "prop-types"
import React from "react"
import "./layout.css"

const Header = () => (
  <div>
    <header>
      WESLEY SEQUEIRA
    </header>
    <hr/>
      <h2>
      SOFTWARE DEVELOPER
    </h2>
    <hr/>
  </div>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: `hahaha`,
}

export default Header
