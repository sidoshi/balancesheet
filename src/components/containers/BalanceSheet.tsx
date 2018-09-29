import * as React from 'react'
import { connect } from 'react-redux'

import AddTransactionForm from '../AddTransactionForm'
import EntriesList from '../EntriesList'
import { Entries } from '../../types'

import {
  selectDebitEntries,
  selectCreditEntries,
  selectCreditEntriesTotal,
  selectDebitEntriesTotal,
} from '../../selectors'
import { ApplicationState } from '../../store'

interface Props {
  creditEntries: Entries
  debitEntries: Entries
  creditTotal: number
  debitTotal: number
}

const BalaceSheet = ({
  creditEntries,
  debitEntries,
  creditTotal,
  debitTotal,
}: Props) => (
  <div>
    <AddTransactionForm />
    <EntriesList
      creditEntries={creditEntries}
      debitEntries={debitEntries}
      creditTotal={creditTotal}
      debitTotal={debitTotal}
    />
  </div>
)

const mapStateToProps = (state: ApplicationState) => ({
  creditEntries: selectCreditEntries(state),
  debitEntries: selectDebitEntries(state),
  creditTotal: selectCreditEntriesTotal(state),
  debitTotal: selectDebitEntriesTotal(state),
})

export default connect(mapStateToProps)(BalaceSheet)
