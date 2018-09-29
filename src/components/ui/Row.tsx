import { Table } from 'semantic-ui-react'
import styled from 'styled-components'

const Row = styled(Table.Row)`
  &&& {
    font-size: 16px;
    .amount {
      letter-spacing: 1px;
    }
  }
`

export default Row
