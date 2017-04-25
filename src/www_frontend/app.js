import React from 'react';
import {QueryRenderer} from 'react-relay'
import environment from 'helpers/environment'
import DevTools from 'cores/DevTools'
import {
  HashRouter as Router,
  Route, Switch
} from 'react-router-dom'
import Book from './components/Book/Book'
import Author from './components/Book/Author'
import AccessDenied from './components/Pages/Error/AccessDenied'
import NotFound from './components/Pages/Error/NotFound'
import ServerError from './components/Pages/Error/ServerError'
import {layouts} from './components'
const {
    ErrorLayout,
    RootLayout
} = layouts;

export default () => {
  return (
    <QueryRenderer
      environment={environment}
      query={graphql`
        query appQuery {
          viewer {
            ...Book_viewer
          }
        }
      `}
      render={({error, props}) => {
        if (error) {
          return (
            <p>
              Error: {error.message}
            </p>
          )
        } else if (props) {
          return (
            <div>
            {process.env.NODE_ENV !== 'production' && <DevTools />}
              <Router>
                <Route path="/">
                  <RootLayout>
                    <Switch>
                      <Route exact path="/" render={() => <Book {...props} />} />
                      <Route path="/author" render={() => <Author {...props} />} />
                      <ErrorLayout>
                        <Route path="/403" component={AccessDenied}/>
                        <Route path="/404" component={NotFound}/>
                        <Route path="/500" components={ServerError}/>
                      </ErrorLayout>
                      <Route component={NotFound}/>
                    </Switch>
                  </RootLayout>
                </Route>
              </Router>
            </div>
          );
        }
        return (
          <p>
            Loading
          </p>
        )
      }}
    />
  )
}