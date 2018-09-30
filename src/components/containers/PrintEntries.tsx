import * as React from 'react'
import { connect } from 'react-redux'
import zip from 'lodash/zip'
import { format } from 'date-fns'
import styled from 'styled-components'

import { Entries } from '../../types'
import { ApplicationState } from '../../store'
import capitalized from 'utils/capitalized'
import inrFmt from 'utils/inrFmt'
import {
  selectDebitEntries,
  selectCreditEntries,
  selectCreditEntriesTotal,
  selectDebitEntriesTotal,
} from '../../selectors'

interface Props {
  creditEntries: Entries
  debitEntries: Entries
  creditTotal: number
  debitTotal: number
}

const Wrapper = styled.div`
  &&& {
    width: 100%;
    min-height: 100vh;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    color: black;
    table {
      border-collapse: collapse;
    }
    th,
    td {
      border: 1px solid black;
      padding: 10px;
      min-width: 100px;
    }
  }
`

class PrintEntries extends React.Component<Props> {
  public componentDidMount() {
    document.title = format(new Date(), 'dd-MM-YYYY')
    window.print()
  }

  public render() {
    const entries = zip(this.props.debitEntries, this.props.creditEntries)

    return (
      <Wrapper>
        <table>
          <thead>
            <tr>
              <th colSpan={2}>Debit</th>
              <th colSpan={2}>Credit</th>
            </tr>
            <tr>
              <th>Name</th>
              <th>Amount</th>

              <th>Name</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {entries.map(([debitEntry, creditEntry]) => (
              <tr
                key={
                  debitEntry
                    ? debitEntry.userId
                    : creditEntry && creditEntry.userId
                }
              >
                <td>{debitEntry ? capitalized(debitEntry.name) : null}</td>
                <td>{debitEntry ? inrFmt(debitEntry.amount) : ''}</td>
                <td>{creditEntry ? capitalized(creditEntry.name) : null}</td>
                <td className="amount">
                  {creditEntry ? inrFmt(creditEntry.amount) : ''}
                </td>
              </tr>
            ))}
            <tr>
              <td />
              <th>{inrFmt(this.props.debitTotal)}</th>
              <td />
              <th>{inrFmt(this.props.creditTotal)}</th>
            </tr>
          </tbody>
        </table>
      </Wrapper>
    )
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  creditEntries: selectCreditEntries(state),
  debitEntries: selectDebitEntries(state),
  creditTotal: selectCreditEntriesTotal(state),
  debitTotal: selectDebitEntriesTotal(state),
})

export default connect(mapStateToProps)(PrintEntries)
