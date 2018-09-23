import * as React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { store } from './store'
import theme from './styles/theme'

export default ({ children }: React.Props<{}>) => (
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </BrowserRouter>
  </Provider>
)
