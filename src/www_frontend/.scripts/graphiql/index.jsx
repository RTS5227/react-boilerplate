import React from 'react';
import ReactDOM from 'react-dom';
import GraphiQL from 'graphiql';
import 'graphiql/graphiql.css';

function graphQLFetcher(graphQLParams) {
  return fetch(window.location.origin + '/graphql', {
    method: 'post',
    headers: { 
    	'Content-Type': 'application/json',
    	'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxIiwidW5hbWUiOiJnb2QiLCJlbWFpbCI6ImdvZEBhZG1pbi5jb20iLCJyb2xlIjoiIiwiZXhwIjoxNDkzMDkyNDY3fQ.wJbOvx-5DFAgAONWzEfXXiFV3Jicli7GcXaO9cuPTZY'
    	},
    body: JSON.stringify(graphQLParams),
  }).then(response => response.json());
}

ReactDOM.render(<GraphiQL fetcher={graphQLFetcher} />, document.getElementById('root'));
