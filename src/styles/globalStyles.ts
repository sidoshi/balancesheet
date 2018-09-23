import { injectGlobal } from 'styled-components'
import theme from './theme'

import 'semantic-ui-css/semantic.min.css'

const ingectGlobalStyles = () => injectGlobal`
body {
  margin: 0;
  color: ${theme.textPrimary};
}
`

export default ingectGlobalStyles
