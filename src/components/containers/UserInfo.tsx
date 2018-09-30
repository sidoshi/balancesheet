import * as React from 'react'
import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'
import { toast } from 'react-toastify'
import { Dispatch, bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import SecondaryPage from './SecondaryPage'
import Button from '../ui/Button'
import { TransactionsList } from './Transactions'
import { ApplicationState } from 'store'
import { deleteTransaction, removeDeletedUser } from 'store/financials/actions'
import { deleteUser } from 'store/user/actions'
import capitalized from 'utils/capitalized'
import inrFmt from 'utils/inrFmt'
import {
  UsersById,
  Transaction,
  CalculatedBalancesByUserId,
  CASH_ID,
} from 'types'
import {
  selectUsersById,
  selectUsersRecentTransactions,
  selectCalculatedBalances,
} from 'selectors'

interface UserInfoProps {
  match: {
    params: {
      userId: string
    }
  }
  usersById: UsersById
  usersRecentTransactions: Transaction[]
  calculatedBalances: CalculatedBalancesByUserId
  deleteTransaction: typeof deleteTransaction
  deleteUser: typeof deleteUser
  removeDeletedUser: typeof removeDeletedUser
}

const Panel = styled.div`
  background-color: ${props => props.theme.backgroundTertiary};
  display: flex;
  padding: 10px;
  align-items: center;
  border-radius: 5px;
  box-shadow: 5px 3px 8px ${props => props.theme.shadowPrimary};

  p {
    font-size: 20px;
  }

  &&& {
    button {
      margin-left: auto;
    }
  }

  &&& > * {
    margin: 0 10px;
  }
`

const createUserDeleter = (props: UserInfoProps) => (userId: string) => {
  if (userId === CASH_ID) {
    toast.error('Cannot delete cash user')
    return
  }

  const name = props.usersById[userId].name
  const confirmation = `Are you sure to delete user: ${capitalized(name)}`
  if (!window.confirm(confirmation)) {
    return
  }
  props.usersRecentTransactions.forEach(t => props.deleteTransaction(t.id))
  props.removeDeletedUser(userId)
  props.deleteUser(userId)
}

const UserInfo = (props: UserInfoProps) => {
  const userid = props.match.params.userId
  const user = props.usersById[userid]
  const balance = props.calculatedBalances[userid] || 0
  const userDeleter = createUserDeleter(props)

  if (!user) {
    return <SecondaryPage header="User Deleted">{null}</SecondaryPage>
  }

  return (
    <SecondaryPage header="User Info">
      <Panel>
        <p>
          <Icon name="user" />
          {capitalized(user.name)}
        </p>
        <p>
          <Icon name="rupee" />
          {inrFmt(Math.abs(balance))}
        </p>
        <Button
          onClick={userDeleter.bind(null, userid)}
          variant="themed"
          primary={true}
        >
          Delete User
        </Button>
      </Panel>

      <TransactionsList
        deleteTransaction={props.deleteTransaction}
        recentTransactions={props.usersRecentTransactions}
        usersById={props.usersById}
      />
    </SecondaryPage>
  )
}

const mapStateToProps = (state: ApplicationState, props: UserInfoProps) => ({
  usersById: selectUsersById(state),
  usersRecentTransactions: selectUsersRecentTransactions(
    state,
    props.match.params
  ),
  calculatedBalances: selectCalculatedBalances(state),
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      deleteTransaction,
      deleteUser,
      removeDeletedUser,
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserInfo)
