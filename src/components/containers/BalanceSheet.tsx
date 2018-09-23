import * as React from 'react'
import { connect } from 'react-redux'

import AddTransactionForm from '../AddTransactionForm'
import { Entries } from '../../types'

import { selectDebitEntries, selectCreditEntries } from '../../selectors'
import { ApplicationState } from '../../store'

interface Props {
  creditEntries: Entries
  debitEntries: Entries
}

const BalaceSheet = ({ creditEntries, debitEntries }: Props) => (
  <div>
    <AddTransactionForm />
  </div>
)

const mapStateToProps = (state: ApplicationState) => ({
  creditEntries: selectCreditEntries(state),
  debitEntries: selectDebitEntries(state),
})

export default connect(mapStateToProps)(BalaceSheet)
