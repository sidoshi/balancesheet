import {
  selectCalculatedBalances,
  selectRecentTransactions,
  selectUsersRecentTransactions,
} from '../index'
import { mergeDefaultState, createMockTransaction } from './utils'

test('selectCalculatedBalances', () => {
  const calculatedBalances = {
    user1: 10000,
    cash: 20000,
    user2: -20000,
  }

  const state = mergeDefaultState(s => ({
    ...s,
    financials: {
      ...s.financials,
      calculatedBalances,
    },
  }))

  expect(selectCalculatedBalances(state)).toEqual(calculatedBalances)
})

test('selectRecentTransactions', () => {
  const transaction1 = createMockTransaction('user1')
  const transaction2 = createMockTransaction('user1')
  const transaction3 = createMockTransaction('user1')
  const transaction4 = createMockTransaction('user2')

  const state = mergeDefaultState(s => ({
    ...s,
    financials: {
      ...s.financials,
      recentTransactions: [
        transaction1,
        transaction2,
        transaction3,
        transaction4,
      ],
    },
  }))

  expect(selectRecentTransactions(state)).toEqual([
    transaction1,
    transaction2,
    transaction3,
    transaction4,
  ])
})

test('selectUsersRecentTransactions', () => {
  const transaction1 = createMockTransaction('user1')
  const transaction2 = createMockTransaction('user1')
  const transaction3 = createMockTransaction('user1')
  const transaction4 = createMockTransaction('user2')

  const state = mergeDefaultState(s => ({
    ...s,
    financials: {
      ...s.financials,
      recentTransactions: [
        transaction1,
        transaction2,
        transaction3,
        transaction4,
      ],
    },
  }))

  expect(selectUsersRecentTransactions(state, { userId: 'user1' })).toEqual([
    transaction1,
    transaction2,
    transaction3,
  ])
})
