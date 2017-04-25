import React from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'

const Author = (props) => {
	return (
		<div>Author: {props.authorName} (redux)</div>
	);
}

const mapStateToProps = state => {
	console.log(state);
	return {
		authorName: 'J. K. Rowling'
	}
};

export default withRouter(connect(mapStateToProps)(Author))