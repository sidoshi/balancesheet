import * as React from 'react'
import { storiesOf } from '@storybook/react'
import styled from 'styled-components'

import AutoComplete from '../AutoComplete'

const FlexWrapper = styled.div`
  padding: 20px;
  background-color: ${props => props.theme.backgroundSecondary};
`

interface Fruit {
  id: number
  fruit: string
}

const items: Fruit[] = [
  { id: 1, fruit: 'Apple' },
  { id: 2, fruit: 'Orange' },
  { id: 3, fruit: 'Guaba' },
  { id: 4, fruit: 'Berry' },
  { id: 5, fruit: 'Straww' },
  { id: 6, fruit: 'Papaya' },
  { id: 7, fruit: 'Grbanu' },
]

const getSuggestions = (inputValue: string | null) =>
  inputValue
    ? items.filter(i =>
        i.fruit.toLowerCase().includes(inputValue.toLowerCase())
      )
    : items

const itemToString = (item: Fruit) => (item ? item.fruit.toUpperCase() : '')

class Form extends React.Component<{}> {
  public state = {
    items,
    value: '',
  }

  constructor(props: object) {
    super(props)
  }

  public render() {
    return (
      <FlexWrapper>
        <AutoComplete
          getSuggestions={getSuggestions}
          itemToString={itemToString}
          onInputValueChange={this.onInputValueChange}
          inputValue={this.state.value.toUpperCase()}
        />
      </FlexWrapper>
    )
  }

  private onInputValueChange = (inputValue: string) =>
    this.setState({
      value: inputValue.toLowerCase(),
    })
}

storiesOf('AutoComplete', module)
  .add('simple', () => (
    <FlexWrapper>
      <AutoComplete
        getSuggestions={getSuggestions}
        itemToString={itemToString}
      />
    </FlexWrapper>
  ))
  .add('themed simple', () => (
    <FlexWrapper>
      <AutoComplete
        variant="themed"
        getSuggestions={getSuggestions}
        itemToString={itemToString}
      />
    </FlexWrapper>
  ))
  .add('state controlled form', () => <Form />)
  .add('themed with label', () => (
    <FlexWrapper>
      <AutoComplete
        variant="themed"
        getSuggestions={getSuggestions}
        itemToString={itemToString}
        label="Fruits"
      />
    </FlexWrapper>
  ))
  .add('themed with icon', () => (
    <FlexWrapper>
      <AutoComplete
        variant="themed"
        getSuggestions={getSuggestions}
        itemToString={itemToString}
        icon="users"
        iconPosition="left"
      />
    </FlexWrapper>
  ))
