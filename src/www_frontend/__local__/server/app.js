import path from 'path';
import express from 'express';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {createLocation} from 'history';
import Helmet from 'react-helmet';
import { StaticRouter } from 'react-router-dom'

const env = process.env;
const assetsPath = `${env.npm_package_config_appWebpackBaseUrl}/${env.npm_package_version}`;
const publicPath = path.resolve('../public');
const routes = require(path.resolve(__dirname, '../../src/www_frontend/Routes')).default;

let app = express();
app.set('trust proxy', 'loopback');
app.set('x-powered-by', false);
app.use(express.static(publicPath));

app.use((req, res, next) => {
  const context = {}
  let markup = renderToString(
    <StaticRouter location={req.url} context={context}>{routes}</StaticRouter>
  );
  let helmet = Helmet.rewind();
  let html = [
    `<!DOCTYPE html>`,
    `<html>`,
      `<head>`,
        `<title>${helmet.title}</title>`,
        helmet.meta,
        helmet.link,
        `<meta charset="utf-8"/>`,
        `<link rel="stylesheet" href="${assetsPath}/bundle.css"></link>`,
      `</head>`,
      `<body>`,
        `<div id="app">${markup}</div>`,
      `</body>`,
      `<script type="text/javascript" src="${assetsPath}/bundle.js"></script>`,
    `</html>`
  ].join('');
  res.setHeader('Content-Type', 'text/html');
  res.send(html);
});

export default app;