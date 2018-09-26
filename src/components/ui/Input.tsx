import * as React from 'react'
import { Input, InputProps } from 'semantic-ui-react'
import styled from 'styled-components'

export interface Props extends InputProps {
  variant?: 'themed' | 'default'
  props?: string
}

const StyledInput = styled(Input)`
  &&& {
    width: ${props => props.width || 'initial'};
  }
`

const ThemedInput = styled(StyledInput)`
  &&& {
    .label {
      background-color: ${props => props.theme.backgroundTertiary};
      color: ${props => props.theme.textPrimary};
    }
    input {
      background-color: ${props => props.theme.backgroundPrimary};
      color: ${props => props.theme.textPrimary};
    }
    .icon {
      color: ${props => props.theme.textPrimary};
    }
    .button.icon {
      background-color: ${props => props.theme.backgroundPrimary};
      color: ${props => props.theme.textSecondary};

      & .icon {
        color: ${props => props.theme.textSecondary};
        transition: color 0.5s;
        &:hover {
          color: ${props => props.theme.textPrimary};
        }
      }
    }
  }
`

export default (props: Props) => {
  const { variant = 'default', ...inputProps } = props
  return variant === 'default' ? (
    <StyledInput {...inputProps} />
  ) : (
    <ThemedInput {...inputProps} />
  )
}
