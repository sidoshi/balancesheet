import * as React from 'react'
import * as ReactDOM from 'react-dom'

import AppWrapper from './AppWrapper'
import ingectGlobalStyles from './styles/globalStyles'
import App from './components/containers/App'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <AppWrapper>
    <App />
  </AppWrapper>,
  document.getElementById('root') as HTMLElement
)

registerServiceWorker()
ingectGlobalStyles()
