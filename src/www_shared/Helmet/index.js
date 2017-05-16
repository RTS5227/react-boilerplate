import React from 'react'
import Helmet from 'react-helmet'
import config from '../../config.json'
export default ({children}) => {
	return (
		<Helmet
            titleTemplate={`%s - ${config.serviceName}`}
            defaultTitle={config.serviceName} >
		{children}
		</Helmet>
	)
}