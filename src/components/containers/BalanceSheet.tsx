import * as React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import AddTransactionForm from '../AddTransactionForm'
import EntriesList from '../EntriesList'
import { Entries } from '../../types'

import { selectDebitEntries, selectCreditEntries } from '../../selectors'
import { ApplicationState } from '../../store'

interface Props {
  creditEntries: Entries
  debitEntries: Entries
}

const Con = styled.div`
  display: flex;
  justify-content: center;
  div {
    margin: 0px auto;
  }
`

const BalaceSheet = ({ creditEntries, debitEntries }: Props) => (
  <div>
    <AddTransactionForm />
    <Con>
      <EntriesList entries={debitEntries} />
      <EntriesList entries={creditEntries} />
    </Con>
  </div>
)

const mapStateToProps = (state: ApplicationState) => ({
  creditEntries: selectCreditEntries(state),
  debitEntries: selectDebitEntries(state),
})

export default connect(mapStateToProps)(BalaceSheet)
