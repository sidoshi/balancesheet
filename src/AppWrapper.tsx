import * as React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { store } from './store'

export default ({ children }: React.Props<{}>) => (
  <Provider store={store}>
    <BrowserRouter>{children}</BrowserRouter>
  </Provider>
)
