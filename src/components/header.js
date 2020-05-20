import PropTypes from "prop-types"
import React from "react"
import "./layout.css"

const Header = ({ siteTitle }) => (
  <div>
    <header>
      {siteTitle}
    </header>
    <hr/>
      <h2>
      Software Developer
    </h2>
    <hr/>
  </div>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
