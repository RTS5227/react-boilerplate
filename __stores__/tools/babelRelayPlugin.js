import getBabelRelayPlugin from 'babel-relay-plugin';
import schema from '../data/schema.json';

module.exports = getBabelRelayPlugin(schema.data);
