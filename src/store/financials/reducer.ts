import { Reducer } from 'redux'
import { ActionType, getType } from 'typesafe-actions'

import { FinancialsState } from '../../types'
import * as actions from './actions'
import {
  createTransaction,
  deleteTransaction,
  cleanupOldTransactions,
} from './core'

export type FinancialsAction = ActionType<typeof actions>

export const initialState: FinancialsState = {
  calculatedBalances: {},
  recentTransactions: [],
}

const reducer: Reducer<FinancialsState> = (
  state: FinancialsState = initialState,
  action: FinancialsAction
) => {
  switch (action.type) {
    case getType(actions.createTransaction):
      return createTransaction(state, action.payload)

    case getType(actions.deleteTransaction):
      return deleteTransaction(state, action.payload)

    case getType(actions.clearTransactions):
      return cleanupOldTransactions(state)

    default:
      return state
  }
}

export default reducer
