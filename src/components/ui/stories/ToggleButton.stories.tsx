import * as React from 'react'
import { storiesOf } from '@storybook/react'

import ToggleButton from '../ToggleButton'

class Toggle extends React.Component {
  public state = {
    selectedIndex: 0,
  }

  public render() {
    return (
      <ToggleButton
        variant="themed"
        toggleValues={['Debit', 'Credit']}
        selectedIndex={this.state.selectedIndex}
        onUpdate={this.onUpdate}
      />
    )
  }

  private onUpdate = (i: number) =>
    this.setState({
      selectedIndex: i,
    })
}

storiesOf('ToggleButton', module).add('simple', () => <Toggle />)
