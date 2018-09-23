import * as React from 'react'
import { Input, InputProps } from 'semantic-ui-react'
import styled from 'styled-components'

interface Props extends InputProps {
  variant?: 'themed' | 'default'
}

const ThemedInput = styled(Input)`
  &&& {
    .label {
      background-color: ${props => props.theme.backgroundTertiary};
      color: ${props => props.theme.textPrimary};
    }
    input {
      background-color: ${props => props.theme.backgroundPrimary};
      color: ${props => props.theme.textPrimary};
      border-color: ${props => props.theme.backgroundTertiary};
    }
    i {
      color: ${props => props.theme.textPrimary};
    }
  }
`

export default (props: Props) => {
  const { variant = 'default', ...inputProps } = props
  return variant === 'default' ? (
    <Input {...inputProps} />
  ) : (
    <ThemedInput {...inputProps} />
  )
}
