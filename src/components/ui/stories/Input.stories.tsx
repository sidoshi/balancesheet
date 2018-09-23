import * as React from 'react'
import { storiesOf } from '@storybook/react'

import Input from '../Input'

storiesOf('Input', module)
  .add('simple', () => <Input />)
  .add('with label', () => <Input label="Name" />)
  .add('with icon', () => <Input icon="users" />)
  .add('with left icon', () => <Input icon="users" iconPosition="left" />)
  .add('themed simple', () => <Input variant="themed" />)
  .add('themed with label', () => <Input variant="themed" label="Name" />)
  .add('themed with icon', () => <Input variant="themed" icon="users" />)
  .add('themed with left icon', () => (
    <Input variant="themed" icon="users" iconPosition="left" />
  ))
