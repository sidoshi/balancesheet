import React from 'react'
import { configure, addDecorator } from '@storybook/react'
import 'semantic-ui-css/semantic.min.css'

const req = require.context('../src/components', true, /\.stories\.tsx$/)

const styles = {
  backgroundColor: '#121212',
  width: '100%',
  height: '100vh',
  padding: '10px',
}

const CenterDecorator = storyFn => <div style={styles}>{storyFn()}</div>

function loadStories() {
  const AppDecorator = require('../src/storyBookDecorators.tsx').AppDecorator
  addDecorator(CenterDecorator)
  addDecorator(AppDecorator)
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
