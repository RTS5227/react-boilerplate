import express from 'express';
import app from './app'; // React server
//import graphQL from './graphql'; // GraphQL server

const env = process.env;
const host = env.npm_package_config_appServerHost;
const port = env.npm_package_config_appServerPort;

let router = express();
//router.use('/graphql', graphQL);
router.use('/*', app);

let server = router.listen(port, host);

/*let server = router.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})*/

export default server;