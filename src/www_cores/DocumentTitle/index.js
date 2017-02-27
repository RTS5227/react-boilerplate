import React from 'react'
import DocumentTitle from 'react-document-title'
const Config = require('../../config.json');
export default (props) => {
    return <DocumentTitle {...props} title={props.title + ' - ' + Config.serviceName}/>
}