import * as React from 'react'
import styled from 'styled-components'
import Downshift, { ControllerStateAndHelpers } from 'downshift'
import classnames from 'classnames'

import Input, { Props as InputProps } from './Input'

interface Suggestion {
  id: string | number
  [key: string]: any
}

interface Props extends InputProps {
  // onChange for downshift.
  onSelect?: (
    selectedItem: Suggestion,
    stateAndHelpers: ControllerStateAndHelpers<Suggestion>
  ) => void

  getSuggestions: (inputValue: string | null) => Suggestion[]
  itemToString: (suggestion: Suggestion) => string
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void

  onInputValueChange?: (
    inputValue: string,
    stateAndHelpers: ControllerStateAndHelpers<Suggestion>
  ) => void
  inputValue?: string
}

const LIST_HEIGHT = 200
const DEFAULT_BACKGROUND_COLOR = 'white'
const DEFAULT_FONT_COLOR = 'black'
const DEFAULT_BORDER_COLOR = '#dededf'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const ListContainer = styled.div`
  position: relative;
  height: 0px;
`

// This element uses absolute positioning because it is not meant to take up
// the parent element's space. It should float in the space. The behaviour is
// similar to a tooltip.
const DefaultList = styled.div`
  border: 1px solid ${DEFAULT_BORDER_COLOR};
  background-color: ${DEFAULT_BACKGROUND_COLOR};
  color: ${DEFAULT_FONT_COLOR};

  margin: 0;
  padding: 0;
  list-style: none;
  border-radius: 4px;

  position: absolute;
  left: 0;
  right: 0;
  top: 1px;
  max-height: ${LIST_HEIGHT}px;
  overflow-y: auto;
  overflow-x: hidden;
`

const DefaultListItem = styled.div`
  /* 
  This padding is the default padding inn the current component.
  Need to find a way to reuse that instead of hardcoding.
  */
  padding: 9.5px 14px;
  word-wrap: normal;
  border-bottom: 1px solid ${DEFAULT_BORDER_COLOR};

  &.active {
    background-color: ${props => props.theme.primary};
  }
  &.selected {
    font-weight: bolder;
    border-bottom: 1px solid ${DEFAULT_FONT_COLOR};
    border-top: 1px solid ${DEFAULT_FONT_COLOR};
  }
`

const ThemedList = styled(DefaultList)`
  border-color: ${props => props.theme.backgroundTertiary};
  background-color: ${props => props.theme.backgroundPrimary};
  color: ${props => props.theme.textPrimary};
`

const ThemedListItem = styled(DefaultListItem)`
  border-bottom: 1px solid ${props => props.theme.backgroundTertiary};
  background-color: ${props => props.theme.backgroundPrimary};

  &.selected {
    font-weight: bolder;
    border-bottom: 1px solid ${props => props.theme.textPrimary};
    border-top: 1px solid ${props => props.theme.textPrimary};
  }
`

interface SuggestionProps {
  props: Props
  ds: ControllerStateAndHelpers<Suggestion>
}

const Suggestions = ({ props, ds }: SuggestionProps) => {
  if (!ds.isOpen) {
    return null
  }

  const suggestions = props.getSuggestions(ds.inputValue)

  if (suggestions.length === 0) {
    return null
  }

  const variant: typeof props.variant = props.variant || 'default'

  const List = variant === 'default' ? DefaultList : ThemedList
  const ListItem = variant === 'default' ? DefaultListItem : ThemedListItem

  return (
    <ListContainer>
      <List {...ds.getMenuProps()}>
        {suggestions.map((suggestion, index) => (
          <ListItem
            {...ds.getItemProps({
              key: suggestion.id,
              index,
              item: suggestion,
            })}
            className={classnames({
              selected: ds.selectedItem === suggestion,
              active: ds.highlightedIndex === index,
            })}
          >
            {props.itemToString(suggestion)}
          </ListItem>
        ))}
      </List>
    </ListContainer>
  )
}

export default (props: Props) => (
  <Downshift
    onChange={props.onSelect}
    itemToString={props.itemToString}
    inputValue={props.inputValue}
    onInputValueChange={props.onInputValueChange}
  >
    {ds => {
      const {
        onSelect,
        getSuggestions,
        itemToString,
        onKeyPress,
        onInputValueChange,
        inputValue,
        ...inputProps
      } = props

      return (
        <div style={{ display: 'inline-block' }}>
          <Wrapper>
            <Input {...ds.getInputProps()} {...inputProps} />
            <Suggestions props={props} ds={ds} />
          </Wrapper>
        </div>
      )
    }}
  </Downshift>
)
