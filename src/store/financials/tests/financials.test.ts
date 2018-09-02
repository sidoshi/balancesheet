import { addDays } from 'date-fns'

import * as actions from '../actions'
import reducer from '../reducer'
import { TransactionType, CASH_ID } from '../../../types'

const mockDateNow = (ms: number) => {
  const now = Date.now
  Date.now = jest.fn().mockReturnValue(ms)

  return () => {
    Date.now = now
  }
}

type TransactionsMatrix = Array<[string, number, TransactionType]>

test('creates transaction', () => {
  const transactions: TransactionsMatrix = [
    ['user1', 100000, TransactionType.CASH],
    ['user1', -50000, TransactionType.CASH],
    ['user2', -50000, TransactionType.CASH],
    ['user2', -50000, TransactionType.CASH],
    ['user3', 100000, TransactionType.NON_CASH],
  ]

  const transaction1Action = actions.createTransaction(...transactions[0])
  const transaction2Action = actions.createTransaction(...transactions[1])
  const transaction3Action = actions.createTransaction(...transactions[2])
  const transaction4Action = actions.createTransaction(...transactions[3])
  const transaction5Action = actions.createTransaction(...transactions[4])

  const state1 = reducer(undefined, transaction1Action)
  expect(state1.calculatedBalances).toEqual({
    user1: 100000,
    [CASH_ID]: -100000,
  })
  expect(state1.recentTransactions).toEqual([transaction1Action.payload])

  const state2 = reducer(state1, transaction2Action)
  expect(state2.calculatedBalances).toEqual({
    user1: 50000,
    [CASH_ID]: -50000,
  })
  expect(state2.recentTransactions).toEqual([
    transaction2Action.payload,
    transaction1Action.payload,
  ])

  const state3 = reducer(state2, transaction3Action)
  expect(state3.calculatedBalances).toEqual({
    user1: 50000,
    user2: -50000,
    [CASH_ID]: 0,
  })
  expect(state3.recentTransactions).toEqual([
    transaction3Action.payload,
    transaction2Action.payload,
    transaction1Action.payload,
  ])

  const state4 = reducer(state3, transaction4Action)
  expect(state4.calculatedBalances).toEqual({
    user1: 50000,
    user2: -100000,
    [CASH_ID]: 50000,
  })
  expect(state4.recentTransactions).toEqual([
    transaction4Action.payload,
    transaction3Action.payload,
    transaction2Action.payload,
    transaction1Action.payload,
  ])

  const state5 = reducer(state4, transaction5Action)
  expect(state5.calculatedBalances).toEqual({
    user1: 50000,
    user2: -100000,
    user3: 100000,
    [CASH_ID]: 50000,
  })
  expect(state5.recentTransactions).toEqual([
    transaction5Action.payload,
    transaction4Action.payload,
    transaction3Action.payload,
    transaction2Action.payload,
    transaction1Action.payload,
  ])
})

test('deleted transaction', () => {
  const transactions: TransactionsMatrix = [
    ['user1', 100000, TransactionType.CASH],
    ['user1', -50000, TransactionType.CASH],
    ['user2', -50000, TransactionType.CASH],
    ['user3', 100000, TransactionType.NON_CASH],
  ]

  const transaction1Action = actions.createTransaction(...transactions[0])
  const transaction2Action = actions.createTransaction(...transactions[1])
  const transaction3Action = actions.createTransaction(...transactions[2])
  const transaction4Action = actions.createTransaction(...transactions[3])

  const state1 = reducer(undefined, transaction1Action)
  const state2 = reducer(state1, transaction2Action)
  const state3 = reducer(state2, transaction3Action)
  const state4 = reducer(state3, transaction4Action)

  expect(state4.calculatedBalances).toEqual({
    user1: 50000,
    user2: -50000,
    user3: 100000,
    [CASH_ID]: 0,
  })
  expect(state4.recentTransactions).toEqual([
    transaction4Action.payload,
    transaction3Action.payload,
    transaction2Action.payload,
    transaction1Action.payload,
  ])

  const state5 = reducer(
    state4,
    actions.deleteTransaction(transaction4Action.payload.id)
  )
  expect(state5.calculatedBalances).toEqual({
    user1: 50000,
    user2: -50000,
    user3: 0,
    [CASH_ID]: 0,
  })
  expect(state5.recentTransactions).toEqual([
    transaction3Action.payload,
    transaction2Action.payload,
    transaction1Action.payload,
  ])

  const state6 = reducer(
    state5,
    actions.deleteTransaction(transaction2Action.payload.id)
  )
  expect(state6.calculatedBalances).toEqual({
    user1: 100000,
    user2: -50000,
    user3: 0,
    [CASH_ID]: -50000,
  })
  expect(state6.recentTransactions).toEqual([
    transaction3Action.payload,
    transaction1Action.payload,
  ])

  const state7 = reducer(
    state6,
    actions.deleteTransaction(transaction3Action.payload.id)
  )
  expect(state7.calculatedBalances).toEqual({
    user1: 100000,
    user2: 0,
    user3: 0,
    [CASH_ID]: -100000,
  })
  expect(state7.recentTransactions).toEqual([transaction1Action.payload])
})

test('cleanups old transaction', () => {
  const transactions: TransactionsMatrix = [
    ['user1', 100000, TransactionType.CASH],
    ['user1', -50000, TransactionType.CASH],
    ['user2', -50000, TransactionType.CASH],
    ['user3', 100000, TransactionType.NON_CASH],
    ['user4', 50000, TransactionType.CASH],
  ]

  const transaction1Action = actions.createTransaction(...transactions[0])
  const transaction2Action = actions.createTransaction(...transactions[1])
  const transaction3Action = actions.createTransaction(...transactions[2])
  const transaction4Action = actions.createTransaction(...transactions[3])

  const msAfter10Days = addDays(new Date(), 10).getTime()
  const resetDateMock = mockDateNow(msAfter10Days)

  const transaction5Action = actions.createTransaction(...transactions[4])

  const state1 = reducer(undefined, transaction1Action)
  const state2 = reducer(state1, transaction2Action)
  const state3 = reducer(state2, transaction3Action)
  const state4 = reducer(state3, transaction4Action)
  const state5 = reducer(state4, transaction5Action)

  expect(state5.calculatedBalances).toEqual({
    user1: 50000,
    user2: -50000,
    user3: 100000,
    user4: 50000,
    [CASH_ID]: -50000,
  })
  expect(state5.recentTransactions).toEqual([
    transaction5Action.payload,
    transaction4Action.payload,
    transaction3Action.payload,
    transaction2Action.payload,
    transaction1Action.payload,
  ])

  const state6 = reducer(state5, actions.clearTransactions())
  expect(state5.calculatedBalances).toEqual({
    user1: 50000,
    user2: -50000,
    user3: 100000,
    user4: 50000,
    [CASH_ID]: -50000,
  })
  expect(state6.recentTransactions).toEqual([transaction5Action.payload])
  resetDateMock()
})
