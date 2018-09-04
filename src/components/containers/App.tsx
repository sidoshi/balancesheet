import * as React from 'react'
import styled from 'styled-components'
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

const BaseContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`

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
      <BaseContainer>
        <Route exact={true} path="/" component={BalanceSheetContainer} />
        <Route path="/user/:userId" component={UserInfoContainer} />
        <Route path="/transactions" component={TransactionsContainer} />
      </BaseContainer>
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
