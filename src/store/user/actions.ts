import { generate } from 'shortid'
import { createAction, createStandardAction } from 'typesafe-actions'

import { User, CASH_ID } from '../../types'
import * as actions from './constants'

type ID = string

export const addUser = createAction(
  actions.ADD_USER,
  resolve => (name: string) =>
    resolve({
      name,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      id: name.toLowerCase() === 'cash' ? CASH_ID : generate(),
    } as User)
)

export const updateUser = createStandardAction(actions.UPDATE_USER)<{
  id: ID
  newName: string
}>()

export const deleteUser = createStandardAction(actions.DELETE_USER)<ID>()
