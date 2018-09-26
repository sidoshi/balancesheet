import * as React from 'react'
import { Button } from 'semantic-ui-react'

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

export default (props: Props) => (
  <Button.Group>
    <StyledButton
      {...props}
      primary={props.selectedIndex === 0}
      onClick={props.onUpdate.bind(null, 0, props.toggleValues[0])}
    >
      {props.toggleValues[0]}
    </StyledButton>
    <Button.Or text="" />
    <StyledButton
      {...props}
      primary={props.selectedIndex === 1}
      onClick={props.onUpdate.bind(null, 1, props.toggleValues[1])}
    >
      {props.toggleValues[1]}
    </StyledButton>
  </Button.Group>
)
