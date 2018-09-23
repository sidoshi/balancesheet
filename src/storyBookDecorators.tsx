import * as React from 'react'
import AppWrapper from './AppWrapper'

export const AppDecorator = (storyFn: () => React.ReactNode) => (
  <AppWrapper>{storyFn()}</AppWrapper>
)
