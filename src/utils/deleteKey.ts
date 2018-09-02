/**
 * Immutably delete a key from a object and return the object with given type
 *
 * interface User = {..}
 *
 * interface UsersById = {
 *  [id: string]: User
 * }
 *
 * const usersById: UsersById = {
 *  id1: user1,
 *  id2: user2
 * }
 *
 * deleteKey<UsersById>(usersById, id1)
 * --> deletes id1 from usersById and preserves the type
 *
 */

const deleteKey = <T>(obj: any, key: string): T => {
  const { [key]: value, ...remaining } = obj
  return remaining
}

export default deleteKey
