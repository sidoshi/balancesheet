import * as React from 'react'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import countBy from 'lodash/countBy'
import styled from 'styled-components'
import { toast } from 'react-toastify'

import { addUser } from '../store/user/actions'
import { createTransaction } from '../store/financials/actions'
import { selectSortedUsers, selectUsersByName } from '../selectors'
import { ApplicationState } from '../store'
import { TransactionType, User, UsersByName } from '../types'
import inrFmt from '../utils/inrFmt'
import capitalized from '../utils/capitalized'
import { buildUser } from '../store/user/core'
import { buildTransaction } from '../store/financials/core'
import Button from './ui/Button'
import Input from './ui/Input'
import ToggleButton from './ui/ToggleButton'
import AutoComplete from './ui/AutoComplete'

interface Props {
  sortedUsers: User[]
  usersByName: UsersByName
  addUser: typeof addUser
  createTransaction: typeof createTransaction
}

interface State {
  amount: string
  name: string
  entryType: number
  selectedItem: User | null
}

const Container = styled.div`
  background-color: ${props => props.theme.backgroundTertiary};
  display: flex;
  align-items: center;
  padding: 10px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  &&& > * {
    margin: 0 5px;
  }
`

class AddTransactionForm extends React.Component<Props, State> {
  private nameInputRef = React.createRef()
  private amountInputRef = React.createRef()

  constructor(props: Props) {
    super(props)

    this.state = {
      amount: '',
      name: '',
      entryType: 0,
      selectedItem: null,
    }
  }

  public render() {
    return (
      <Container>
        <ToggleButton
          toggleValues={['Debit', 'Credit']}
          selectedIndex={this.state.entryType}
          onUpdate={this.onEntryTypeToggle}
          variant="themed"
          tabIndex={1}
        />

        <AutoComplete
          type="text"
          inputValue={this.visibleName(this.state.name)}
          onInputValueChange={this.onNameChange}
          onKeyPress={this.onKeyPress}
          getSuggestions={this.getSuggestions}
          itemToString={this.userToString}
          icon="user"
          iconPosition="left"
          variant="themed"
          tabIndex={1}
          selectedItem={this.state.selectedItem}
          onSelect={this.onSelect}
          innerRef={this.nameInputRef}
        />

        <Input
          type="text"
          value={this.visibleAmount(this.state.amount)}
          onChange={this.onAmountChange}
          onKeyPress={this.onKeyPress}
          icon="rupee"
          iconPosition="left"
          variant="themed"
          tabIndex={1}
          innerRef={this.amountInputRef}
        />

        <Button primary={true} tabIndex={1} onClick={this.createTransaction}>
          Submit
        </Button>
      </Container>
    )
  }

  private onNameChange = (value: string) => {
    const name = value.toLowerCase()
    this.setState({ name })
  }

  private getSuggestions = (value: string) => {
    const users = this.props.sortedUsers
    return users.filter(u =>
      u.name.toLowerCase().startsWith(value.toLowerCase())
    )
  }

  private userToString = (user: User) =>
    user == null ? '' : this.visibleName(user.name)

  private onAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = e.target.value || ''
    if (num === '' || num === '-') {
      this.setState({ amount: '' })
      return
    }
    const commasStripped = num.replace(/\,/g, '')
    if ((countBy(commasStripped)['.'] || 0) > 1) {
      return
    }
    if (!Number.isNaN(+commasStripped) || commasStripped === '-') {
      const amount = Math.abs(Number.parseInt(commasStripped, 10)).toString()
      this.setState({ amount })
    }
  }

  private onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      this.createTransaction()
    }
  }

  private createTransaction = () => {
    const { name, entryType } = this.state
    let { amount } = this.state

    if (!name) {
      toast.error('Please enter a valid name')
      return (this.nameInputRef.current as any).focus()
    }

    if (!amount) {
      toast.error('Please enter a valid amount')
      return (this.amountInputRef.current as any).focus()
    }

    if (entryType === 1) {
      amount = `-${amount}`
    }

    let user = this.props.usersByName[name]
    if (!user) {
      user = buildUser(name)
      this.props.addUser(user)
    }

    this.props.createTransaction(
      buildTransaction(user.id, Number.parseFloat(amount), TransactionType.CASH)
    )
    toast.success('Transaction Success')
    this.resetForm()
    ;(this.nameInputRef.current as any).focus()
  }

  private visibleName(name: string): string {
    return capitalized(name)
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

  private resetForm = () => {
    this.setState({
      amount: '',
      name: '',
      selectedItem: null,
    })
  }

  private onEntryTypeToggle = (entryTypeIndex: number) =>
    this.setState({
      entryType: entryTypeIndex,
    })

  private onSelect = (user: User) =>
    this.setState({
      selectedItem: user,
    })
}

const mapStateToProps = (state: ApplicationState) => ({
  sortedUsers: selectSortedUsers(state),
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
