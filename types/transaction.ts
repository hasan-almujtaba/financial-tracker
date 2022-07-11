export interface Transaction {
  id?: string
  user_id: string
  amount: string
  category: string
  note?: string
  date: string
}

export interface TransactionTable {
  transactions: Transaction[]
  type: 'incomes' | 'expenses'
}

export interface TransactionFormProps {
  requestHandler: (transaction: Transaction) => Promise<void>
}

export interface CreateTransactionFormProps {
  setOpened: (opened: boolean) => void
}
