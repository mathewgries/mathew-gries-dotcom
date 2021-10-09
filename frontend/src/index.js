import React from 'react'
import ReactDOM from 'react-dom'
import { Amplify } from 'aws-amplify';
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import App from './App'
import { store } from './app/store'
import { Provider } from 'react-redux'
import config from './config';

import { worker } from './api/server'

Amplify.configure({
  Auth: {
    mandatorySignIn: false,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  },
  Storage: {
    region: config.s3.REGION,
    bucket: config.s3.BUCKET,
    identityPoolId: config.cognito.IDENTITY_POOL_ID
  },
  API: {
    endpoints: [
      {
        name: "mathewgriesdotcom",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      },
    ]
  }
});

// Start our mock API server
worker.start({ onUnhandledRequest: 'bypass' })

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
