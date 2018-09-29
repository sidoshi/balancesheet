import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import BalanceSheetContainer from './BalanceSheet'
import UserInfoContainer from './UserInfo'
import TransactionsContainer from './Transactions'
import UsersContainer from './Users'
import { ApplicationState } from '../../store'
import { selectUsersById, selectCreditEntries } from '../../selectors'
import { addUser } from '../../store/user/actions'
import { UsersById, CASH_ID } from '../../types'
import { buildUser } from '../../store/user/core'
import { clearTransactions } from 'store/financials/actions'

interface AppProps {
  usersById: UsersById
  addUser: typeof addUser
  clearTransactions: typeof clearTransactions
}

class App extends React.Component<AppProps> {
  public componentDidMount() {
    if (!this.props.usersById[CASH_ID]) {
      this.props.addUser(buildUser('cash', true))
    }
    this.props.clearTransactions()
  }

  public render() {
    return (
      <React.Fragment>
        <Switch>
          <Route exact={true} path="/" component={BalanceSheetContainer} />
          <Route path="/users" component={UsersContainer} />
          <Route path="/user/:userId" component={UserInfoContainer} />
          <Route path="/transactions" component={TransactionsContainer} />
        </Switch>
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
      clearTransactions,
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
