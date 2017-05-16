import React from 'react';
import PropTypes from 'prop-types';
import config from '../../../config.json';
import Helmet from 'react-helmet';

/* eslint-disable react/no-danger */

class Html extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    children: PropTypes.string,
    assets: PropTypes.object,
    ssr: PropTypes.bool,
  };

  render() {
    const { title, description, assets, children, ssr } = this.props;
    const head = Helmet.rewind();//console.log(assets)
    return (
      <html lang="en-us">
        <head>
          <meta charSet="utf-8" />
          {head.base.toComponent()}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {head.script.toComponent()}
          {!ssr && <meta name="fragment" content="!" />}
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {/* styles (will be present only in production with webpack extract text plugin) */}
          {Object.keys(assets.styles).map((style, key) =>
            <link href={assets.styles[style]} key={key} media="screen, projection"
                  rel="stylesheet" type="text/css" charSet="UTF-8"/>
          )}
        </head>
        <body>
          <div id="root" dangerouslySetInnerHTML={{ __html: children }} />
          {!ssr && <script src={assets.javascript.main} charSet="UTF-8"/>}
          {config.analytics && config.analytics.googleTrackingId &&
            <script
              dangerouslySetInnerHTML={{ __html:
              'window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;' +
              `ga('create','${config.analytics && config.analytics.googleTrackingId}','auto');ga('send','pageview')` }}
            />
          }
          {config.analytics && config.analytics.googleTrackingId &&
            <script src="https://www.google-analytics.com/analytics.js" async defer />
          }
        </body>
      </html>
    );
  }
}

export default Html;