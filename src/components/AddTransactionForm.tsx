import * as React from 'react'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import startCase from 'lodash-es/startCase'
import countBy from 'lodash-es/countBy'
import styled from 'styled-components'

import { addUser } from '../store/user/actions'
import { createTransaction } from '../store/financials/actions'
import { selectUsersByName } from '../selectors'
import { ApplicationState } from '../store'
import { UsersByName, TransactionType } from '../types'
import inrFmt from '../utils/inrFmt'
import { padEnd } from 'lodash-es'
import { buildUser } from '../store/user/core'
import { buildTransaction } from '../store/financials/core'

interface Props {
  usersByName: UsersByName
  addUser: typeof addUser
  createTransaction: typeof createTransaction
}

interface State {
  amount: string
  name: string
}

const Container = styled.div`
  padding: 10px;
  box-shadow: 0px 3px 3px -2px gray;

  & * {
    margin: 0 5px;
  }
`

class AddTransactionForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      amount: '',
      name: '',
    }
  }

  public render() {
    return (
      <Container>
        <label>
          Name:
          <input
            type="text"
            value={this.visibleName(this.state.name)}
            onChange={this.onNameChange}
            onKeyPress={this.onKeyPress}
          />
        </label>

        <label>
          Amount:
          <input
            type="text"
            value={this.visibleAmount(this.state.amount)}
            onChange={this.onAmountChange}
            onKeyPress={this.onKeyPress}
          />
        </label>

        <button onClick={this.createTransaction}>Submit</button>
      </Container>
    )
  }

  private onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value.toLowerCase()
    this.setState({ name })
  }

  private onAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = e.target.value || ''
    if (num === '') {
      this.setState({ amount: '' })
    }
    const commasStripped = num.replace(/\,/g, '')
    if ((countBy(commasStripped)['.'] || 0) > 1) {
      return
    }
    if (!Number.isNaN(+commasStripped) || commasStripped === '-') {
      this.setState({ amount: commasStripped })
    }
  }

  private onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      this.createTransaction()
    }
  }

  private createTransaction = () => {
    const { name, amount } = this.state

    let user = this.props.usersByName[name]
    if (!user) {
      user = buildUser(name)
      this.props.addUser(user)
    }

    this.props.createTransaction(
      buildTransaction(user.id, Number.parseFloat(amount), TransactionType.CASH)
    )
    this.resetForm()
  }

  private visibleName(name: string): string {
    const capitalized = startCase(name.toLowerCase())
    return padEnd(capitalized, name.length)
  }

  private visibleAmount(amount: string): string {
    if (amount === '') {
      return ''
    }

    if (amount === '-') {
      return '-'
    }

    let negate = false
    if (amount.startsWith('-')) {
      negate = true
    }

    const [int, fr] = amount.split('.')

    const addSuffix = amount !== Number.parseFloat(amount).toString() || fr
    const formatted = inrFmt(Math.abs(Number.parseInt(int, 10)))
    const negative = negate ? `-${formatted}` : formatted
    return addSuffix ? `${negative}.${fr}` : negative
  }

  private resetForm() {
    this.setState({
      amount: '',
      name: '',
    })
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  usersByName: selectUsersByName(state),
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      addUser,
      createTransaction,
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTransactionForm)
