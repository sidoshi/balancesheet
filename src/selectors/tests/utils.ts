import { generate } from 'shortid'

import { ApplicationState, rootReducer, mockAction } from '../../store'
import { buildUser } from '../../store/user/core'
import { buildTransaction } from '../../store/financials/core'
import { TransactionType } from '../../types'

type Merger = (state: ApplicationState) => ApplicationState

// Gets default state from the store and passes it to merger to add new state
export const mergeDefaultState = (merger: Merger): ApplicationState =>
  merger(rootReducer(undefined, mockAction))

export const createMockUser = (
  name: string = 'Test User',
  cash: boolean = false
) => buildUser(name, cash)

export const createMockTransaction = (
  userId: string = generate(),
  amount: number = 100000,
  transactionType: TransactionType = TransactionType.CASH
) => buildTransaction(userId, amount, transactionType)
