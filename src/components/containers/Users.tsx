import * as React from 'react'

import SecondaryPage from './SecondaryPage'
import { ApplicationState } from 'store'
import { selectSortedUsers, selectCalculatedBalances } from 'selectors'
import { connect } from 'react-redux'
import { User, CalculatedBalancesByUserId } from 'types'
import { Table } from 'semantic-ui-react'
import Row from '../ui/Row'
import Link from '../ui/Link'
import capitalized from 'utils/capitalized'
import inrFmt from 'utils/inrFmt'
import { format, toDate } from 'date-fns'
interface Props {
  sortedUsers: User[]
  calculatedBalances: CalculatedBalancesByUserId
}

const Users = (props: Props) => {
  return (
    <SecondaryPage header="Users">
      <Table inverted={true} celled={true} collapsing={false} padded="very">
        <Table.Header>
          <Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Balance</Table.HeaderCell>
            <Table.HeaderCell>Created</Table.HeaderCell>
          </Row>
        </Table.Header>
        <Table.Body>
          {props.sortedUsers.map(user => (
            <Row key={user.id}>
              <Table.Cell>
                <Link to={`/user/${user.id}`}>{capitalized(user.name)}</Link>
              </Table.Cell>
              <Table.Cell className="amount">
                {inrFmt(Math.abs(props.calculatedBalances[user.id]))}
              </Table.Cell>
              <Table.Cell>
                {format(toDate(user.createdAt), 'dd/MM/YY - hh:mm a')}
              </Table.Cell>
            </Row>
          ))}
        </Table.Body>
      </Table>
    </SecondaryPage>
  )
}

const mapStateToProps = (state: ApplicationState) => ({
  sortedUsers: selectSortedUsers(state),
  calculatedBalances: selectCalculatedBalances(state),
})

export default connect(mapStateToProps)(Users)
