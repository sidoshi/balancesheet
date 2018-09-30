import { createStandardAction } from 'typesafe-actions'

import { Transaction } from '../../types'
import * as actions from './constants'

type TransactionID = string

export const createTransaction = createStandardAction(
  actions.CREATE_TRANSACTION
)<Transaction>()

export const deleteTransaction = createStandardAction(
  actions.DELETE_TRANSACTION
)<TransactionID>()

export const clearTransactions = createStandardAction(
  actions.CLEAR_TRANSACTIONS
)<void>()

export const removeDeletedUser = createStandardAction(
  actions.REMOVE_DELETED_USER
)<string>()
