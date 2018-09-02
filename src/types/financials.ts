export const CASH_ID = 'cash_QMlK1Gb-K'

/**
 *
 * This is a calculated representation of all the transactions.
 * Cash user is a special case. On every CASH transaction, the opposite
 * entry is reflected on cash account. When a CASH transaction is deleted,
 * the reflected calculation is also deleted.
 *
 * If the amount is positive, we owe user the amount. i.e. DEBIT
 * If the amount is negative, user owes us the amount. i.e. CREDIT
 *
 * Cash account should be on credit side and hence should be mostly negative.
 * If the Cash account goes positive, it means we have negative Cash balance
 * which also means we owe that amount to Cash account. So normally it would be
 * considered as a DEBT. But to keep the representation friendly, it should
 * still be shown as a CREDIT with a negative amount.
 *
 */
export interface CalculatedBalancesByUserId {
  [id: string]: number
}

export enum TransactionType {
  CASH,
  NON_CASH,
}

export interface Transaction {
  id: string
  userId: string
  amount: number
  type: TransactionType
  createdAt: number
}

export type Transactions = Transaction[]

export interface FinancialsState {
  calculatedBalances: CalculatedBalancesByUserId
  recentTransactions: Transactions
}
