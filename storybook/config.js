import React from 'react'
import { configure, addDecorator } from '@storybook/react'
import 'semantic-ui-css/semantic.min.css'

const req = require.context('../src/components', true, /\.stories\.tsx$/)

const styles = {
  backgroundColor: 'black',
  width: '100%',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

const CenterDecorator = storyFn => <div style={styles}>{storyFn()}</div>

function loadStories() {
  addDecorator(CenterDecorator)
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
