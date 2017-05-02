import React from 'react';
import {QueryRenderer} from 'react-relay'
import environment from 'helpers/environment'
import DevTools from 'cores/DevTools'

import Book from './components/Book/Book'
import Chapter from './components/Book/Chapter'
import Author from './components/Book/Author'
import AccessDenied from './components/Pages/Error/AccessDenied'
import NotFound from './components/Pages/Error/NotFound'
import ServerError from './components/Pages/Error/ServerError'
import {layouts} from './components'
const {
    ErrorLayout,
    RootLayout
} = layouts;

export default async ({api}) {
  const viewer = await api.fetchQuery(graphql`
    viewer {
      ...Book_viewer,
      ...Chapter_viewer
    }
  `);
  return [{
    path: '/',
    action: () => ({
      title: 'Home',
      component: <Book viewer={viewer} />
    }),
  }, {
    path: '/new',
    action: () => ({
      title: 'New Books',
      component: <Book viewer={viewer} />
    }),
  }, {
    path: '/404',
    action: () => ({
      title: '404 Not Found',
      component: <NotFound />
    }),
  }, {
    path: '/403',
    action: () => ({
      title: '403 Access Denied',
      component: <AccessDenied />
    }),
  }, {
    path: '/500',
    action: () => ({
      title: '500 Internal Server Error',
      component: <ServerError />
    })
  }];
}