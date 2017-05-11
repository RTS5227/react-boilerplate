const fetch = require('node-fetch');
const fs = require('fs');
const config = require('../src/config.json');

const {
    buildClientSchema,
    introspectionQuery,
    printSchema,
} = require('graphql/utilities');

fetch(config.graphqlServer, {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 'query': introspectionQuery }),
})
    .then(res => res.json())
    .then(res => {
        console.log(res);
        const schemaString = printSchema(buildClientSchema(res.data));
        fs.writeFileSync('schema.graphql', schemaString);
    });
