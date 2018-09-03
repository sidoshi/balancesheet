import { selectUsersById, selectUsersByName } from '../index'
import { mergeDefaultState, createMockUser } from './utils'

test('selectUsersById', () => {
  const usersById = {
    testUserId: createMockUser('Test User'),
  }
  const state = mergeDefaultState(s => ({
    ...s,
    users: {
      ...s.users,
      usersById,
    },
  }))
  expect(selectUsersById(state)).toEqual(usersById)
})

test('selectUsersByName', () => {
  const usersByName = {
    'Test User': createMockUser('Test User'),
  }
  const state = mergeDefaultState(s => ({
    ...s,
    users: {
      ...s.users,
      usersByName,
    },
  }))
  expect(selectUsersByName(state)).toEqual(usersByName)
})
