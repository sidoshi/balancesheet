import * as React from 'react'
import { Button, ButtonProps } from 'semantic-ui-react'
import styled from 'styled-components'

// Themed variant matches the current theme. It does not support primary,
// secondary etc props.
// Use default button for other usecase
interface Props extends ButtonProps {
  variant?: 'default' | 'themed'
}

const StyledButton = styled(Button)`
  &&& {
    box-shadow: 1px 1px 2px ${props => props.theme.shadow};

    &:hover {
      box-shadow: 2px 2px 2px 2px ${props => props.theme.shadow};
    }
  }
`

const PrimaryButton = styled(StyledButton)`
  &&& {
    background-color: ${props => props.theme.backgroundTertiary};
    color: ${props => props.theme.textSecondary};
    transition: 0.5s;

    &:hover {
      opacity: 0.9;
    }
  }
`

export default (props: Props) => {
  const { variant = 'default', ...buttonProps } = props
  return variant === 'default' ? (
    <StyledButton {...buttonProps} />
  ) : (
    <PrimaryButton {...buttonProps} />
  )
}
