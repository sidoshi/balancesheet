import * as React from 'react'
// import styled from 'styled-components'

import { Entries } from '../types'

interface Props {
  entries: Entries
}

const EntriesList = ({ entries }: Props) => (
  <div>
    {entries.map(entry => (
      <p key={entry.userId}>
        {entry.name} - {entry.amount}
      </p>
    ))}
  </div>
)

export default EntriesList
