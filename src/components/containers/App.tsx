import * as React from 'react'
import { Route } from 'react-router-dom'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import BalanceSheetContainer from './BalanceSheet'
import UserInfoContainer from './UserInfo'
import TransactionsContainer from './Transactions'
import { ApplicationState } from '../../store'
import { selectUsersById, selectCreditEntries } from '../../selectors'
import { addUser } from '../../store/user/actions'
import { UsersById, CASH_ID } from '../../types'
import { buildUser } from '../../store/user/core'

interface AppProps {
  usersById: UsersById
  addUser: typeof addUser
}

class App extends React.Component<AppProps> {
  public componentDidMount() {
    if (!this.props.usersById[CASH_ID]) {
      this.props.addUser(buildUser('cash', true))
    }
  }

  public render() {
    return (
      <React.Fragment>
        <Route exact={true} path="/" component={BalanceSheetContainer} />
        <Route path="/user/:userId" component={UserInfoContainer} />
        <Route path="/transactions" component={TransactionsContainer} />
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  usersById: selectUsersById(state),
  creditEntries: selectCreditEntries(state),
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      addUser,
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
