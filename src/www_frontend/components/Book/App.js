import React from 'react';
import Layout from '../Layout';
import Book from './Book';

const title = 'Home';

export default {

  path: '/',

  async action({api}) {
  	const viewer = await api.fetchQuery(graphql`
      query App_Query {
        viewer {
          ...Book_viewer
        }
      }
    `);
    console.info(viewer)
    return {
      title,
      //component: <Layout><Book viewer={viewer} title={title} /></Layout>,
      component: <Book viewer={viewer} title={title} />,
    };
  },

};
