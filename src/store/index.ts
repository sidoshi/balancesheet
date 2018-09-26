import { combineReducers, createStore, Reducer } from 'redux'
import throttle from 'lodash/throttle'

import { UsersState, FinancialsState } from '../types'
import userReducer, { UsersAction } from './user/reducer'
import financialsReducer, { FinancialsAction } from './financials/reducer'
import { loadState, saveState } from './localStorage'

export interface ApplicationState {
  users: UsersState
  financials: FinancialsState
}

// Mock action type to be used while testing
export interface MockAction {
  type: '@mock/IGNORE'
}
export const mockAction: MockAction = {
  type: '@mock/IGNORE',
}

export type RootActions = UsersAction | FinancialsAction | MockAction

export const rootReducer: Reducer<
  ApplicationState,
  RootActions
> = combineReducers<ApplicationState, RootActions>({
  users: userReducer,
  financials: financialsReducer,
})

const persistedState = loadState()
export const store = createStore(
  rootReducer,
  persistedState,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
)

store.subscribe(
  throttle(() => {
    saveState(store.getState())
  }, 2000)
)
