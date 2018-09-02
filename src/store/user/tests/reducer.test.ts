import * as actions from '../actions'
import reducer from '../reducer'

test('adds user', () => {
  const user1AddAction = actions.addUser('User 1')
  const user2AddAction = actions.addUser('User 2')
  const user1 = user1AddAction.payload
  const user2 = user2AddAction.payload

  const stateWithUser1 = reducer(undefined, user1AddAction)
  expect(stateWithUser1.usersByName).toEqual({
    'User 1': user1,
  })
  expect(stateWithUser1.usersById).toEqual({
    [user1.id]: user1,
  })

  const stateWithUser2 = reducer(stateWithUser1, user2AddAction)
  expect(stateWithUser2.usersByName).toEqual({
    'User 2': user2,
    'User 1': user1,
  })
  expect(stateWithUser2.usersById).toEqual({
    [user2.id]: user2,
    [user1.id]: user1,
  })
})

test('updates user', () => {
  const user1AddAction = actions.addUser('User 1')
  const user1 = user1AddAction.payload

  const stateWithUser1 = reducer(undefined, user1AddAction)
  expect(stateWithUser1.usersByName).toEqual({
    'User 1': user1,
  })
  expect(stateWithUser1.usersById).toEqual({
    [user1.id]: user1,
  })

  const updatedState = reducer(
    stateWithUser1,
    actions.updateUser({
      id: user1.id,
      newName: 'User 2',
    })
  )
  expect(updatedState.usersByName).toHaveProperty('User 2')
  expect(updatedState.usersByName).not.toHaveProperty('User 1')
  expect(updatedState.usersById).toHaveProperty(user1.id)
  expect(updatedState.usersById[user1.id].name).toEqual('User 2')
})

test('deletes user', () => {
  const user1AddAction = actions.addUser('User 1')
  const user1 = user1AddAction.payload

  const stateWithUser1 = reducer(undefined, user1AddAction)
  expect(stateWithUser1.usersByName).toEqual({
    'User 1': user1,
  })
  expect(stateWithUser1.usersById).toEqual({
    [user1.id]: user1,
  })

  const updatedState = reducer(stateWithUser1, actions.deleteUser(user1.id))
  expect(updatedState.usersByName).not.toHaveProperty('User 1')
  expect(updatedState.usersById).not.toHaveProperty(user1.id)
  expect(updatedState.usersByName).toEqual({})
  expect(updatedState.usersById).toEqual({})
})
