import React from 'react'
import Layout from '../Layout'
export default 
{
	path: '/',
	children: [
		{
			path: '/news',
			async action({api}) {
				/*const {viewer} = await api.fetchQuery(graphql`
					query index_Query{
						books
					}
					`
				);*/
				return {
					component: <Layout viewer={viewer}></Layout>
				}
			}
		}, {
			path: '/hot',
			async action({api}) {
				/*const {viewer} = await api.fetchQuery(graphql`
					query index_Query{
						books
					}
					`
				);*/
				return {
					component: <Layout viewer={viewer}></Layout>
				}
			}
		}
	]
	
}
