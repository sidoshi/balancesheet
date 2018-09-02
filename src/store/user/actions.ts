import { generate } from 'shortid'
import { createAction, createStandardAction } from 'typesafe-actions'

import { User } from '../../types'
import * as actions from './constants'

type ID = string

export const addUser = createAction(
  actions.ADD_USER,
  resolve => (name: string) =>
    resolve({
      name,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      id: generate(),
    } as User)
)

export const updateUser = createStandardAction(actions.UPDATE_USER)<{
  id: ID
  newName: string
}>()

export const deleteUser = createStandardAction(actions.DELETE_USER)<ID>()
