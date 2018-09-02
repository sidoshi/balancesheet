import { combineReducers, createStore, Reducer } from 'redux'

import { UsersState, FinancialsState } from '../types'
import userReducer, { UsersAction } from './user/reducer'
import financialsReducer, { FinancialsAction } from './financials/reducer'

export interface ApplicationState {
  users: UsersState
  financials: FinancialsState
}

export type RootActions = UsersAction | FinancialsAction

const reducers: Reducer<ApplicationState, RootActions> = combineReducers<
  ApplicationState,
  RootActions
>({
  users: userReducer,
  financials: financialsReducer,
})

export const store = createStore(reducers)
