import React, { Component } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Terminal from "../components/terminal"



class IndexPage extends Component {
  constructor() {
    super()
    this.state = {
      showTerminal: false
    }
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  componentDidMount(){
    document.body.addEventListener('keydown', this.handleKeyDown)
  }
  componentWillUnmount(){
    document.body.removeEventListener("keydown", this.handleKeyDown);
  }
  handleKeyDown(event) {
    if (event.keyCode == 192) {
      console.log("it worked")
      this.setState({ showTerminal: !this.state.showTerminal });
    }
  }
  render() {
    const showTerminal = this.state.showTerminal;
    return (
      <>
        {showTerminal && <Terminal/>}
        <SEO title="Home" />
        <Layout/>
      </>
    )
  }
}

export default IndexPage
