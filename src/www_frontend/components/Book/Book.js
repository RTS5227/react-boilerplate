import React from 'react';
import Helmet from 'shared/Helmet'
import {
  createFragmentContainer,
  graphql,
} from 'react-relay';
import Link from 'shared/Link';


const Book = props => {
  if (!props.viewer || !props.viewer.book) return <p>Nothing</p>;
  return (
    <div>
      <Helmet>
        <title>{props.viewer.book.title}</title>
      </Helmet>
      Book: {props.viewer.book.title}<br />
      <Link to="/author">Author</Link>
    </div>
  )
}

export default createFragmentContainer(Book, graphql`
		fragment Book_viewer on User {
			book {
        id
        title
      }
		}
	`
)