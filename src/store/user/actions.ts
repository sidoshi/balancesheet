import {  createStandardAction } from 'typesafe-actions'

import { User } from '../../types'
import * as actions from './constants'

type ID = string

export const addUser = createStandardAction(actions.ADD_USER)<User>()

export const updateUser = createStandardAction(actions.UPDATE_USER)<{
  id: ID
  newName: string
}>()

export const deleteUser = createStandardAction(actions.DELETE_USER)<ID>()
