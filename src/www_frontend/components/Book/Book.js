import React from 'react';
import {QueryRenderer} from 'react-relay'
import environment from 'helpers/environment'
import {
  createFragmentContainer,
  graphql,
} from 'react-relay/compat';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const Book = props => {
  if (!props.viewer || !props.viewer.book) return <p>Nothing</p>;
  return (
    <div>
      Book: {props.viewer.book.title} (relay)<br />
      <Link to="/author">Author</Link>
    </div>
  )
}

export default createFragmentContainer(Book, {
	viewer: graphql`
		fragment Book_viewer on Viewer {
			book {
        id
        title
      }
		}
	`
})