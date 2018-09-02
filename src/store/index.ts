import { combineReducers, createStore, Reducer } from 'redux'

import { UsersState } from '../types'
import userReducer, { UsersAction } from './user/reducer'

export interface ApplicationState {
  users: UsersState
}

export type RootActions = UsersAction

const reducers: Reducer<ApplicationState, RootActions> = combineReducers<
  ApplicationState,
  RootActions
>({
  users: userReducer,
})

export const store = createStore(reducers)
