import { UsersState, User } from '../../types'
import deleteKey from '../../utils/deleteKey'

export const addUser = (state: UsersState, user: User): UsersState => {
  // Dont add if already exists. Use update instead.
  if (state.usersById[user.id]) {
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
    name: newName,
    createdAt: oldUser.createdAt,
    updatedAt: new Date().toString(),
  }
  const updatedUsersById = {
    ...state.usersById,
    [id]: newUser,
  }
  const updatedUsersByName = {
    ...state.usersByName,
    [newName]: newUser,
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
