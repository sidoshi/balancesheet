import * as React from 'react'
import { Button } from 'semantic-ui-react'
import styled from 'styled-components'

import StyledButton, { Props as ButtonProps } from './Button'

interface Props extends ButtonProps {
  toggleValues: [string, string]
  selectedIndex: number
  onUpdate: (
    index: number,
    value: string,
    e: React.SyntheticEvent<HTMLButtonElement>
  ) => void
}

const Or = styled(Button.Or)`
  &&&::before {
    background-color: ${props =>
      props.variant === 'themed' ? props.theme.backgroundTertiary : null};
  }
`

export default (props: Props) => (
  <Button.Group>
    <StyledButton
      {...props}
      primary={props.selectedIndex === 0}
      onClick={props.onUpdate.bind(null, 0, props.toggleValues[0])}
    >
      {props.toggleValues[0]}
    </StyledButton>
    <Or text="" variant={props.variant} />
    <StyledButton
      {...props}
      primary={props.selectedIndex === 1}
      onClick={props.onUpdate.bind(null, 1, props.toggleValues[1])}
    >
      {props.toggleValues[1]}
    </StyledButton>
  </Button.Group>
)
