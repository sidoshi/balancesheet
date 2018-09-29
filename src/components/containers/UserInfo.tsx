import * as React from 'react'

import SecondaryPage from './SecondaryPage'

interface UserInfoProps {
  match: {
    params: {
      userId: string
    }
  }
}

const UserInfo = ({ match }: UserInfoProps) => (
  <SecondaryPage header="User Info">
    <h1>User: {match.params.userId}</h1>
  </SecondaryPage>
)

export default UserInfo
