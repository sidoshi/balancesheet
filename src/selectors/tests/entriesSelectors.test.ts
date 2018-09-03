import {
  selectCreditEntries,
  selectDebitEntries,
  selectCreditEntriesTotal,
  selectDebitEntriesTotal,
} from '../index'
import { mergeDefaultState, createMockUser } from './utils'
import { CASH_ID } from '../../types'

describe('selectCreditEntries', () => {
  test('gets all credit entries', () => {
    const calculatedBalances = {
      user1: -50000,
      user2: -40000,
      user3: -30000,
      user4: -20000,
      [CASH_ID]: -60000,
      user5: 10000,
      user6: 20000,
      user7: 30000,
      user8: 40000,
      user9: 50000,
    }
    const state = mergeDefaultState(s => ({
      ...s,
      users: {
        ...s.users,
        usersById: {
          user1: createMockUser('Test User'),
          [CASH_ID]: createMockUser('Cash'),
        },
      },
      financials: {
        ...s.financials,
        calculatedBalances,
      },
    }))

    expect(selectCreditEntries(state)).toEqual([
      { amount: 50000, name: 'Test User', userId: 'user1' },
      { amount: 40000, name: 'Deleted User', userId: 'user2' },
      { amount: 30000, name: 'Deleted User', userId: 'user3' },
      { amount: 20000, name: 'Deleted User', userId: 'user4' },
      { amount: 60000, name: 'Cash', userId: CASH_ID },
    ])
  })

  test('Cash entries are always on credit side', () => {
    const calculatedBalances = {
      user1: -50000,
      user2: -40000,
      user3: -30000,
      user4: -20000,
      [CASH_ID]: 60000,
      user5: 10000,
      user6: 20000,
      user7: 30000,
      user8: 40000,
      user9: 50000,
    }
    const state = mergeDefaultState(s => ({
      ...s,
      users: {
        ...s.users,
        usersById: {
          user1: createMockUser('Test User'),
          [CASH_ID]: createMockUser('Cash'),
        },
      },
      financials: {
        ...s.financials,
        calculatedBalances,
      },
    }))

    expect(selectCreditEntries(state)).toEqual([
      { amount: 50000, name: 'Test User', userId: 'user1' },
      { amount: 40000, name: 'Deleted User', userId: 'user2' },
      { amount: 30000, name: 'Deleted User', userId: 'user3' },
      { amount: 20000, name: 'Deleted User', userId: 'user4' },
      { amount: -60000, name: 'Cash', userId: CASH_ID },
    ])
  })
})

describe('selectCreditEntries', () => {
  test('gets all debit entries', () => {
    const calculatedBalances = {
      user1: -50000,
      user2: -40000,
      user3: -30000,
      user4: -20000,
      [CASH_ID]: -60000,
      user5: 10000,
      user6: 20000,
      user7: 30000,
      user8: 40000,
      user9: 50000,
    }
    const state = mergeDefaultState(s => ({
      ...s,
      users: {
        ...s.users,
        usersById: {
          user5: createMockUser('Test User'),
        },
      },
      financials: {
        ...s.financials,
        calculatedBalances,
      },
    }))

    expect(selectDebitEntries(state)).toEqual([
      { amount: 10000, name: 'Test User', userId: 'user5' },
      { amount: 20000, name: 'Deleted User', userId: 'user6' },
      { amount: 30000, name: 'Deleted User', userId: 'user7' },
      { amount: 40000, name: 'Deleted User', userId: 'user8' },
      { amount: 50000, name: 'Deleted User', userId: 'user9' },
    ])
  })

  test('Cash entries are never on debit side', () => {
    const calculatedBalances = {
      user1: -50000,
      user2: -40000,
      user3: -30000,
      user4: -20000,
      [CASH_ID]: 60000,
      user5: 10000,
      user6: 20000,
      user7: 30000,
      user8: 40000,
      user9: 50000,
    }
    const state = mergeDefaultState(s => ({
      ...s,
      users: {
        ...s.users,
        usersById: {
          user5: createMockUser('Test User'),
          [CASH_ID]: createMockUser('Cash'),
        },
      },
      financials: {
        ...s.financials,
        calculatedBalances,
      },
    }))

    expect(selectDebitEntries(state)).toEqual([
      { amount: 10000, name: 'Test User', userId: 'user5' },
      { amount: 20000, name: 'Deleted User', userId: 'user6' },
      { amount: 30000, name: 'Deleted User', userId: 'user7' },
      { amount: 40000, name: 'Deleted User', userId: 'user8' },
      { amount: 50000, name: 'Deleted User', userId: 'user9' },
    ])
  })
})

test('selectCreditEntriesTotal', () => {
  const calculatedBalances = {
    user1: -50000,
    user2: -40000,
    user3: -30000,
    user4: -20000,
    [CASH_ID]: 60000,
    user5: 10000,
    user6: 20000,
    user7: 30000,
    user8: 40000,
    user9: 50000,
  }
  const state = mergeDefaultState(s => ({
    ...s,
    users: {
      ...s.users,
      usersById: {
        user1: createMockUser('Test User'),
        [CASH_ID]: createMockUser('Cash'),
      },
    },
    financials: {
      ...s.financials,
      calculatedBalances,
    },
  }))

  expect(selectCreditEntriesTotal(state)).toEqual(80000)
})

test('selectDebitEntriesTotal', () => {
  const calculatedBalances = {
    user1: -50000,
    user2: -40000,
    user3: -30000,
    user4: -20000,
    [CASH_ID]: 60000,
    user5: 10000,
    user6: 20000,
    user7: 30000,
    user8: 40000,
    user9: 50000,
  }
  const state = mergeDefaultState(s => ({
    ...s,
    users: {
      ...s.users,
      usersById: {
        user5: createMockUser('Test User'),
        [CASH_ID]: createMockUser('Cash'),
      },
    },
    financials: {
      ...s.financials,
      calculatedBalances,
    },
  }))

  expect(selectDebitEntriesTotal(state)).toEqual(150000)
})
