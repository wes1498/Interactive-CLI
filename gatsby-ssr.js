/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it
const React = require("react")

export const onRenderBody = ({ setHeadComponents }, pluginOptions) => {
  setHeadComponents([
    <script
      src="https://code.jquery.com/jquery-3.4.1.min.js"
      integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
      crossOrigin="anonymous">
    </script>,
    <script src="https://code.jquery.com/jquery-latest.js"></script>,
    <script src="js/jquery.terminal-2.15.4.min.js"></script>,
    <script src="js/jquery.mousewheel-min.js"></script>,
    <script src="https://unpkg.com/js-polyfills/keyboard.js"></script>,
    <script src="https://cdn.jsdelivr.net/gh/jcubic/static/js/wcwidth.js"></script>,
    <script src="https://unpkg.com/jquery.terminal/js/autocomplete_menu.js"></script>,

  ])
}