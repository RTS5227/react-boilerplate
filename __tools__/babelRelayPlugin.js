var getBabelRelayPlugin = require('babel-relay-plugin');
var schema = require('../__data__/schema.json');

module.exports = getBabelRelayPlugin(schema.data);
