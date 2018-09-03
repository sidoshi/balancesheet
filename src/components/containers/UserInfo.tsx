import * as React from 'react'

interface UserInfoProps {
  match: {
    params: {
      userId: string
    }
  }
}

const UserInfo = ({ match }: UserInfoProps) => (
  <h1>User: {match.params.userId}</h1>
)

export default UserInfo
