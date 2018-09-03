import { createSelector } from 'reselect'

import { ApplicationState as State, ApplicationState } from '../store'
import {
  UsersById,
  UsersByName,
  CalculatedBalancesByUserId,
  Transactions,
  Entries,
  CASH_ID,
} from '../types'

export const selectUsersById = (state: State): UsersById =>
  state.users.usersById

export const selectUsersByName = (state: State): UsersByName =>
  state.users.usersByName

export const selectCalculatedBalances = (
  state: State
): CalculatedBalancesByUserId => state.financials.calculatedBalances

export const selectRecentTransactions = (state: State): Transactions =>
  state.financials.recentTransactions

export const selectCreditEntries = createSelector(
  selectCalculatedBalances,
  selectUsersById,
  (balances: CalculatedBalancesByUserId, usersById: UsersById): Entries => {
    return Object.entries(balances)
      .filter(([userId, amount]) => amount < 0 || userId === CASH_ID)
      .map(([userId, amount]) => {
        let visibleAmount = amount
        if (userId === CASH_ID && amount > 0) {
          visibleAmount = -amount
        } else {
          visibleAmount = Math.abs(amount)
        }
        const user = usersById[userId]

        return {
          userId,
          name: (user && user.name) || 'Deleted User',
          amount: visibleAmount,
        }
      })
  }
)

export const selectDebitEntries = createSelector(
  selectCalculatedBalances,
  selectUsersById,
  (balances: CalculatedBalancesByUserId, usersById: UsersById): Entries => {
    return Object.entries(balances)
      .filter(([userId, amount]) => amount > 0 && userId !== CASH_ID)
      .map(([userId, amount]) => {
        const user = usersById[userId]

        return {
          userId,
          name: (user && user.name) || 'Deleted User',
          amount: Math.abs(amount),
        }
      })
  }
)

export const selectCreditEntriesTotal = createSelector(
  selectCreditEntries,
  (creditEntries: Entries): number =>
    creditEntries.reduce((total, entry) => {
      return total + entry.amount
    }, 0)
)

export const selectDebitEntriesTotal = createSelector(
  selectDebitEntries,
  (debitEntries: Entries): number =>
    debitEntries.reduce((total, entry) => {
      return total + entry.amount
    }, 0)
)

export const selectUsersRecentTransactions = createSelector(
  selectRecentTransactions,
  (state: ApplicationState, props: { userId: string }) => props.userId,
  (transactions: Transactions, userId: string): Transactions =>
    transactions.filter(tsx => tsx.userId === userId)
)
