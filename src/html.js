import React from 'react'
import PropTypes from 'prop-types'

export default class HTML extends React.Component {
  render() {
    return (
      <html {...this.props.htmlAttributes}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <link href="https://fonts.googleapis.com/" rel="preconnect" />
          <link
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,700|Rubik:300,400,700&display=swap"
            rel="preload"
            as="style"
          />

          {this.props.headComponents}

          <link
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,700|Rubik:300,400,700&display=swap"
            rel="stylesheet"
          />
        </head>
        <body {...this.props.bodyAttributes}>
          {this.props.preBodyComponents}
          <div
            key={`body`}
            style={{ height: '100%' }}
            className={'wrapper'}
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
        </body>
      </html>
    )
  }
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
