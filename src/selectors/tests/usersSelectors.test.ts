import { selectUsersById, selectUsersByName, selectSortedUsers } from '../index'
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

test('selectSortedUsers', () => {
  const usersByName = {
    'Test User': createMockUser('Test User'),
    'Ab sa': createMockUser('Ab sa'),
    'zb sa': createMockUser('zb sa'),
    'Wb sa': createMockUser('Wb sa'),
    'Jhon Doe': createMockUser('Jhon Doe'),
  }
  const state = mergeDefaultState(s => ({
    ...s,
    users: {
      ...s.users,
      usersByName,
    },
  }))

  expect(selectSortedUsers(state)).toEqual([
    usersByName['Ab sa'],
    usersByName['Jhon Doe'],
    usersByName['Test User'],
    usersByName['Wb sa'],
    usersByName['zb sa'],
  ])
})
