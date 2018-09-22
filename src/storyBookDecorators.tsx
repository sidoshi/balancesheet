import * as React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { store } from './store'

export const AppDecorator = (storyFn: () => React.ReactNode) => (
  <Provider store={store}>
    <BrowserRouter>{storyFn()}</BrowserRouter>
  </Provider>
)
