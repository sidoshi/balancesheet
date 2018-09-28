import * as React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { ToastContainer, cssTransition } from 'react-toastify'

import { store } from './store'
import theme from './styles/theme'

const Fade = cssTransition({
  enter: 'fadeIn',
  exit: 'fadeOut',
  duration: 800,
})

export default ({ children }: React.Props<{}>) => (
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <ToastContainer
          autoClose={2000}
          hideProgressBar={true}
          toastClassName="toast-root"
          bodyClassName="toast-body"
          transition={Fade}
        />
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </div>
    </BrowserRouter>
  </Provider>
)
