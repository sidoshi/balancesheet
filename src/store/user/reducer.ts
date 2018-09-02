import { Reducer } from 'redux'
import { ActionType, getType } from 'typesafe-actions'

import { UsersState } from '../../types'
import * as actions from './actions'
import { addUser, updateUser, deleteUser } from './core'

export type UsersAction = ActionType<typeof actions>

export const initialState: UsersState = {
  usersById: {},
  usersByName: {},
}

const reducer: Reducer<UsersState> = (
  state: UsersState = initialState,
  action: UsersAction
) => {
  switch (action.type) {
    case getType(actions.addUser):
      return addUser(state, action.payload)

    case getType(actions.updateUser):
      return updateUser(state, action.payload.id, action.payload.newName)

    case getType(actions.deleteUser):
      return deleteUser(state, action.payload)

    default:
      return state
  }
}

export default reducer
