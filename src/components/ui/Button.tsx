import * as React from 'react'
import { Button, ButtonProps } from 'semantic-ui-react'
import styled from 'styled-components'

// Themed variant matches the current theme. It does not support primary,
// secondary etc props.
// Use default button for other usecase
export interface Props extends ButtonProps {
  variant?: 'default' | 'themed'
}

const StyledButton = styled(Button)`
  &&& {
    box-shadow: 0 1px 3px ${props => props.theme.shadowPrimary},
      0 1px 2px ${props => props.theme.shadowSecondary};
    transition: 0.5s;

    &.primary {
      background-color: ${props => props.theme.primary};
    }

    &:hover {
      opacity: 0.8;
    }
  }
`

const ThemedButton = styled(StyledButton)`
  &&& {
    background-color: ${props => props.theme.backgroundTertiary};
    color: ${props => props.theme.textPrimary};
  }
`

export default (props: Props) => {
  const { variant = 'default', ...buttonProps } = props
  return variant === 'default' ? (
    <StyledButton {...buttonProps} />
  ) : (
    <ThemedButton {...buttonProps} />
  )
}
