import * as React from 'react'
import { storiesOf } from '@storybook/react'

import Input from '../Input'

storiesOf('Input', module)
  .add('simple', () => <Input />)
  .add('with label', () => <Input label="Name" />)
  .add('with icon', () => <Input icon="users" />)
  .add('with left icon', () => <Input icon="users" iconPosition="left" />)
  .add('contrast simple', () => <Input variant="contrast" />)
  .add('contrast with label', () => <Input variant="contrast" label="Name" />)
  .add('contrast with icon', () => <Input variant="contrast" icon="users" />)
  .add('contrast with left icon', () => (
    <Input variant="contrast" icon="users" iconPosition="left" />
  ))
