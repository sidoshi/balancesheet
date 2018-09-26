import * as React from 'react'
import { Button } from 'semantic-ui-react'
import styled, { withTheme } from 'styled-components'

import StyledButton, { Props as ButtonProps } from './Button'
import { Theme } from 'styles/theme'

interface Props extends ButtonProps {
  toggleValues: [string, string]
  selectedIndex: number
  onUpdate: (
    index: number,
    value: string,
    e: React.SyntheticEvent<HTMLButtonElement>
  ) => void
  theme: Theme
}

const Or = styled(Button.Or)`
  &&&::before {
    background-color: ${props =>
      props.variant === 'themed' ? props.theme.backgroundTertiary : null};
  }
`

const ToggleButton = (props: Props) => {
  const { toggleValues, selectedIndex, onUpdate, theme, ...buttonProps } = props

  const buttonStyles: React.CSSProperties = {}
  if (props.variant === 'themed') {
    buttonStyles.backgroundColor = theme.backgroundPrimary
  }

  return (
    <Button.Group>
      <StyledButton
        {...buttonProps}
        primary={props.selectedIndex === 0}
        onClick={props.onUpdate.bind(null, 0, props.toggleValues[0])}
        style={props.selectedIndex !== 0 ? buttonStyles : {}}
      >
        {props.toggleValues[0]}
      </StyledButton>
      <Or text="" variant={buttonProps.variant} />
      <StyledButton
        {...buttonProps}
        primary={props.selectedIndex === 1}
        onClick={props.onUpdate.bind(null, 1, props.toggleValues[1])}
        style={props.selectedIndex !== 1 ? buttonStyles : {}}
      >
        {props.toggleValues[1]}
      </StyledButton>
    </Button.Group>
  )
}

export default withTheme(ToggleButton)
