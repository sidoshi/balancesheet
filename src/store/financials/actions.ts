import { generate } from 'shortid'
import { createAction, createStandardAction } from 'typesafe-actions'

import { TransactionType, Transaction } from '../../types'
import * as actions from './constants'

type TransactionID = string

export const createTransaction = createAction(
  actions.CREATE_TRANSACTION,
  resolve => (
    userId: string,
    amount: number,
    transactionType: TransactionType
  ) =>
    resolve({
      id: generate(),
      userId,
      amount,
      type: transactionType,
      createdAt: Date.now(),
    } as Transaction)
)

export const deleteTransaction = createStandardAction(
  actions.DELETE_TRANSACTION
)<TransactionID>()

export const clearTransactions = createStandardAction(
  actions.CLEAR_TRANSACTIONS
)<void>()
