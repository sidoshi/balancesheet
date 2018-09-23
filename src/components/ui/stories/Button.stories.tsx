import * as React from 'react'
import { storiesOf } from '@storybook/react'
import styled from 'styled-components'

const MildWrapper = styled.div`
  background-color: ${props => props.theme.backgroundTertiary};
  padding: 20px;
`

import Button from '../Button'

storiesOf('Button', module)
  .add('simple', () => <Button>Add</Button>)
  .add('simple themed', () => <Button variant="themed">Add</Button>)
  .add('emphasis', () => (
    <div>
      <Button primary={true}>Primary</Button>
      <Button secondary={true}>Secondary</Button>
    </div>
  ))
  .add('icon', () => <Button icon="users" />)
  .add('circular icon', () => <Button icon="settings" circular={true} />)
  .add('icon themed', () => <Button variant="themed" icon="users" />)
  .add('circular icon themed', () => (
    <Button variant="themed" icon="settings" circular={true} />
  ))
  .add('basic appearance', () => (
    <MildWrapper>
      <Button basic={true} color="red">
        Red
      </Button>
      <Button basic={true} color="orange">
        Orange
      </Button>
      <Button basic={true} color="yellow">
        Yellow
      </Button>
      <Button basic={true} color="olive">
        Olive
      </Button>
      <Button basic={true} color="green">
        Green
      </Button>
      <Button basic={true} color="teal">
        Teal
      </Button>
      <Button basic={true} color="blue">
        Blue
      </Button>
      <Button basic={true} color="violet">
        Violet
      </Button>
      <Button basic={true} color="purple">
        Purple
      </Button>
      <Button basic={true} color="pink">
        Pink
      </Button>
      <Button basic={true} color="brown">
        Brown
      </Button>
      <Button basic={true} color="grey">
        Grey
      </Button>
      <Button basic={true} color="black">
        Black
      </Button>
    </MildWrapper>
  ))
// .add('simple', () => <Button>Add</Button>)
// .add('simple', () => <Button>Add</Button>)
