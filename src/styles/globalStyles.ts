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
import './semantic/semantic.css'
import 'react-toastify/dist/ReactToastify.css'

const ingectGlobalStyles = () => injectGlobal`
  body {
    margin: 0;
    color: ${theme.textPrimary};
    background-color: ${theme.backgroundPrimary};
    height: auto;
    
    &::selection {
      background-color: #CCE2FF;
      color: ${theme.textPrimary};
    }

    textarea::selection, input::selection {
      background-color: #CCE2FF;
      color: ${theme.textPrimary};
    }
  }

  .toast-root {
    box-shadow:  2px 2px 3px ${theme.shadowPrimary},
      3px 1px 2px ${theme.shadowSecondary};
    border-radius: 5px;
  }

  .toast-body {
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    font-family: Lato;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  .fadeIn {
    animation-name: fadeIn;
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }

    100% {
      opacity: 0;
    }
  }

  .fadeOut {
    animation-name: fadeOut;
  }
`

export default ingectGlobalStyles
