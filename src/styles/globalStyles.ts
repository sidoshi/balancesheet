import { injectGlobal } from 'styled-components'
import theme from './theme'

// We are using a custom semantic-ui build here.
// This is to fix the scroll bar issue. Semantic-UI generates styles for
// scrollbar which is not desirable for some cases. Since css styles can not
// be turned off, creating a custom build without those styles is the only
// option.
// TODO: Ideally, the build should be automated in some manner
// See:
// - https://github.com/Semantic-Org/Semantic-UI/issues/5738
// - https://github.com/Metnew/suicrux/issues/27
import '../../semantic/semantic.css'

const ingectGlobalStyles = () => injectGlobal`
  body {
    margin: 0;
    color: ${theme.textPrimary};
  }
`

export default ingectGlobalStyles
