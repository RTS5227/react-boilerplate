import React from 'react';
import Layout from '../Layout';
import Book from './Book';

const title = 'Home';

export default {

  path: '/',

  async action({api}) {
  	const {viewer} = await api.fetchQuery(graphql`
      query index_Query {
        viewer {
          ...Book_viewer
        }
      }
    `);
    return {
      title,
      component: <Layout viewer={viewer}><Book viewer={viewer} title={title} /></Layout>,
    };
  },

};
