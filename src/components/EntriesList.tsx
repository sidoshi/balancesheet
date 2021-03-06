import * as React from 'react'
import styled from 'styled-components'
import zip from 'lodash/zip'
import { Table } from 'semantic-ui-react'

import Row from './ui/Row'
import { Entries } from '../types'
import inrFmt from '../utils/inrFmt'
import capitalized from '../utils/capitalized'
import Link from './ui/Link'

interface Props {
  creditEntries: Entries
  debitEntries: Entries
  creditTotal: number
  debitTotal: number
}

const Wrapper = styled.div`
  max-width: 800px;
  margin: 100px auto;
`

class EntriesList extends React.Component<Props> {
  public render() {
    const entries = zip(this.props.debitEntries, this.props.creditEntries)

    return (
      <Wrapper>
        <Table inverted={true} celled={true} collapsing={false} padded="very">
          <Table.Header>
            <Row>
              <Table.HeaderCell colSpan="2">Debit</Table.HeaderCell>
              <Table.HeaderCell colSpan="2">Credit</Table.HeaderCell>
            </Row>
            <Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Amount</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Amount</Table.HeaderCell>
            </Row>
          </Table.Header>

          <Table.Body>
            {entries.map(([debitEntry, creditEntry]) => (
              <Row
                key={
                  debitEntry
                    ? debitEntry.userId
                    : creditEntry && creditEntry.userId
                }
              >
                <Table.Cell>
                  {debitEntry ? (
                    <Link to={`/user/${debitEntry.userId}`}>
                      {capitalized(debitEntry.name)}
                    </Link>
                  ) : null}
                </Table.Cell>
                <Table.Cell className="amount">
                  {debitEntry ? inrFmt(debitEntry.amount) : ''}
                </Table.Cell>
                <Table.Cell>
                  {creditEntry ? (
                    <Link to={`/user/${creditEntry.userId}`}>
                      {capitalized(creditEntry.name)}
                    </Link>
                  ) : null}
                </Table.Cell>
                <Table.Cell className="amount">
                  {creditEntry ? inrFmt(creditEntry.amount) : ''}
                </Table.Cell>
              </Row>
            ))}
          </Table.Body>
          <Table.Footer>
            <Row>
              <Table.HeaderCell />
              <Table.HeaderCell className="amount">
                {inrFmt(this.props.debitTotal)}
              </Table.HeaderCell>
              <Table.HeaderCell />
              <Table.HeaderCell className="amount">
                {inrFmt(this.props.creditTotal)}
              </Table.HeaderCell>
            </Row>
          </Table.Footer>
        </Table>
      </Wrapper>
    )
  }
}

export default EntriesList
