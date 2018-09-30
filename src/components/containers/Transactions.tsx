import * as React from 'react'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'

import SecondaryPage from './SecondaryPage'
import Row from '../ui/Row'
import Button from '../ui/Button'
import { ApplicationState } from 'store'
import { selectRecentTransactions, selectUsersById } from 'selectors'
import { Transaction, UsersById } from 'types'
import capitalized from 'utils/capitalized'
import inrFmt from 'utils/inrFmt'
import { format, toDate } from 'date-fns'
import { Dispatch, bindActionCreators } from 'redux'
import { deleteTransaction } from 'store/financials/actions'
import Link from '../ui/Link'

interface Props {
  recentTransactions: Transaction[]
  usersById: UsersById
  deleteTransaction: typeof deleteTransaction
}

export class TransactionsList extends React.Component<Props> {
  public render() {
    return (
      <Table inverted={true} celled={true} collapsing={false} padded="very">
        <Table.Header>
          <Row>
            <Table.HeaderCell>Credit/Debit</Table.HeaderCell>
            <Table.HeaderCell>User Name</Table.HeaderCell>
            <Table.HeaderCell>Amount</Table.HeaderCell>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell />
          </Row>
        </Table.Header>
        <Table.Body>
          {this.props.recentTransactions.map(t => (
            <Row key={t.id}>
              <Table.Cell>{t.amount < 0 ? 'Credit' : 'Debit'}</Table.Cell>
              <Table.Cell>
                <Link to={`/user/${t.userId}`}>
                  {capitalized(this.props.usersById[t.userId].name)}
                </Link>
              </Table.Cell>
              <Table.Cell className="amount">
                {inrFmt(Math.abs(t.amount))}
              </Table.Cell>
              <Table.Cell>
                {format(toDate(t.createdAt), 'dd/MM/YY - hh:mm a')}
              </Table.Cell>
              <Table.Cell>
                <Button
                  onClick={this.deleteTransaction.bind(this, t.id)}
                  icon="times"
                  primary={true}
                  variant="themed"
                />
              </Table.Cell>
            </Row>
          ))}
        </Table.Body>
      </Table>
    )
  }

  private deleteTransaction = (id: string) => {
    const confirmation = `Are you sure you want to delete this transaction?`
    if (!window.confirm(confirmation)) {
      return
    }
    this.props.deleteTransaction(id)
  }
}

const Transactions = (props: Props) => (
  <SecondaryPage header="Recent Transactions">
    <TransactionsList {...props} />
  </SecondaryPage>
)

const mapStateToProps = (state: ApplicationState) => ({
  recentTransactions: selectRecentTransactions(state),
  usersById: selectUsersById(state),
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      deleteTransaction,
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transactions)
