export interface Transaction {
  id?: string
  user_id: string
  amount: string
  category: string
  note?: string
  date: string | Date
  type: string
}

export interface TransactionTable {
  transactions: Transaction[]
  type: 'incomes' | 'expenses'
}

export interface CreateTransactionFormProps {
  setOpened: (opened: boolean) => void
}

export interface EditTransactionFormProps {
  setOpened: (opened: boolean) => void
  transaction: Transaction
}

export interface ReportCardProps {
  title: string
  amount: string | number
}
