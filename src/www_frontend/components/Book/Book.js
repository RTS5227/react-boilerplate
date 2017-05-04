import React from 'react';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay';


const Book = props => {
  if (!props.viewer || !props.viewer.book) return <p>Nothing</p>;
  return (
    <div>
      Book: {props.viewer.book.title} (relay)<br />
      <a href="/author">Author</a>
    </div>
  )
}

export default createFragmentContainer(Book, {
	viewer: graphql`
		fragment Book_viewer on User {
			book {
        id
      }
		}
	`
})