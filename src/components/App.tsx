import * as React from 'react'
import styled from 'styled-components'
import { Route } from 'react-router-dom'

import BalanceSheetContainer from './containers/BalanceSheet'
import UserInfoContainer from './containers/UserInfo'
import TransactionsContainer from './containers/Transactions'

const BaseContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`

class App extends React.Component {
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

export default App
