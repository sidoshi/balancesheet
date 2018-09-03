import { generate } from 'shortid'

import { ApplicationState, rootReducer, mockAction } from '../../store'
import { addUser } from '../../store/user/actions'
import { createTransaction } from '../../store/financials/actions'
import { TransactionType } from '../../types'

type Merger = (state: ApplicationState) => ApplicationState

// Gets default state from the store and passes it to merger to add new state
export const mergeDefaultState = (merger: Merger): ApplicationState =>
  merger(rootReducer(undefined, mockAction))

export const createMockUser = (name: string = 'Test User') =>
  addUser(name).payload

export const createMockTransaction = (
  userId: string = generate(),
  amount: number = 100000,
  transactionType: TransactionType = TransactionType.CASH
) => createTransaction(userId, amount, transactionType).payload
