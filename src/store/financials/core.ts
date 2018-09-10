import { generate } from 'shortid'
import { subDays, isAfter, toDate } from 'date-fns'

import toFixed from '../../utils/toFixed'
import {
  FinancialsState,
  Transaction,
  CASH_ID,
  TransactionType,
} from '../../types'

export const buildTransaction = (
  userId: string,
  amount: number,
  transactionType: TransactionType
): Transaction => ({
  id: generate(),
  userId,
  amount,
  type: transactionType,
  createdAt: Date.now(),
})

/**
 * A new transaction is added to the list of transactions and its effect on
 * calulatedBalances is updated.
 *
 * If the transaction is a CASH transaction, the cash account is also updated
 */
export const createTransaction = (
  state: FinancialsState,
  tsx: Transaction
): FinancialsState => {
  tsx.amount = toFixed(tsx.amount, 2)

  const currentBalance = state.calculatedBalances[tsx.userId] || 0
  const newBalance = currentBalance + tsx.amount

  const currentCashBalance = state.calculatedBalances[CASH_ID] || 0
  const newCashBalance =
    tsx.type === TransactionType.CASH && tsx.userId !== CASH_ID
      ? currentCashBalance - tsx.amount
      : currentCashBalance

  return {
    calculatedBalances: {
      ...state.calculatedBalances,
      [CASH_ID]: toFixed(newCashBalance, 2),
      [tsx.userId]: toFixed(newBalance, 2),
    },
    recentTransactions: [tsx, ...state.recentTransactions],
  }
}

/**
 * A transaction with given id is removed if it exists
 * If the transaction is a CASH transaction, the cash account is also updated
 */
export const deleteTransaction = (
  state: FinancialsState,
  id: string
): FinancialsState => {
  const transactionIndex = state.recentTransactions.findIndex(t => t.id === id)
  if (transactionIndex < 0) {
    return state
  }

  const tsx = state.recentTransactions[transactionIndex]

  const currentBalance = state.calculatedBalances[tsx.userId] || 0
  const newBalance = currentBalance - tsx.amount

  const currentCashBalance = state.calculatedBalances[CASH_ID] || 0
  const newCashBalance =
    tsx.type === TransactionType.CASH && tsx.userId !== CASH_ID
      ? currentCashBalance + tsx.amount
      : currentCashBalance

  return {
    calculatedBalances: {
      ...state.calculatedBalances,
      [CASH_ID]: toFixed(newCashBalance, 2),
      [tsx.userId]: toFixed(newBalance, 2),
    },
    recentTransactions: state.recentTransactions.filter(t => t.id !== id),
  }
}

/**
 * We need to keep cleaning up the transactions list as transactions that
 * are certain period old are of no use and takes up space on the app user's
 * machine. We also don't want this cleanup to have any effect on the
 * calculated balances
 */
export const cleanupOldTransactions = (
  state: FinancialsState,
  durationDays: number = 10
): FinancialsState => {
  const keepTransactionsUntil = subDays(toDate(Date.now()), durationDays)

  return {
    ...state,
    recentTransactions: state.recentTransactions.filter(tsx =>
      isAfter(toDate(tsx.createdAt), keepTransactionsUntil)
    ),
  }
}
