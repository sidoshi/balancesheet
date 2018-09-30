import { Link } from 'react-router-dom'
import styled from 'styled-components'

export default styled(Link)`
  color: ${props => props.theme.textPrimary};

  &&:hover {
    color: ${props => props.theme.textPrimary};
    text-decoration: underline;
  }
`
