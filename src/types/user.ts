export interface User {
  name: string
  createdAt: string
  id: string
}

export interface UsersById {
  [id: string]: User
}

export interface UsersByName {
  [name: string]: User
}

export interface UsersState {
  usersById: UsersById
  usersByName: UsersByName
}
