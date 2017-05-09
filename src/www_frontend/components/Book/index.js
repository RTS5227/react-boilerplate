import React from 'react';
import Layout from '../Layout';
import Book from './Book';
import {
  graphql,
} from 'react-relay';

const title = 'Home';

export default {
  path: '/',
  async action({api}) {
    return {
      title,
      //component: <Layout><Book viewer={viewer} title={title} /></Layout>,
      component: <Book title={title} />,
    };
  },

};
