import { generate } from 'shortid'

import { UsersState, User, CASH_ID } from '../../types'
import deleteKey from '../../utils/deleteKey'

export const buildUser = (name: string, cash: boolean = false): User => ({
  name: name.toLowerCase(),
  id: cash ? CASH_ID : generate(),
  createdAt: Date.now(),
  updatedAt: Date.now(),
})

export const addUser = (state: UsersState, user: User): UsersState => {
  user.name = user.name.toLowerCase()

  // Dont add if already exists. Use update instead.
  if (state.usersById[user.id]) {
    return state
  }
  if (state.usersByName[user.name]) {
    return state
  }

  return {
    ...state,
    usersById: {
      ...state.usersById,
      [user.id]: user,
    },
    usersByName: {
      ...state.usersByName,
      [user.name]: user,
    },
  }
}

export const updateUser = (
  state: UsersState,
  id: string,
  newName: string
): UsersState => {
  // Dont update if doesn't exists. Use add instead.
  if (!state.usersById[id]) {
    return state
  }

  const oldUser = state.usersById[id]
  const newUser: User = {
    id,
    name: newName.toLowerCase(),
    createdAt: oldUser.createdAt,
    updatedAt: Date.now(),
  }
  const updatedUsersById = {
    ...state.usersById,
    [id]: newUser,
  }
  const updatedUsersByName = {
    ...state.usersByName,
    [newName.toLowerCase()]: newUser,
  }

  return {
    ...state,
    usersById: updatedUsersById,
    usersByName: deleteKey(updatedUsersByName, oldUser.name),
  }
}

export const deleteUser = (state: UsersState, id: string): UsersState => ({
  ...state,
  usersById: deleteKey(state.usersById, id),
  usersByName: deleteKey(state.usersByName, state.usersById[id].name),
})
