export interface Transaction {
  id?: string
  user_id: string
  amount: string | number
  category: string
  note?: string
  date: string | Date
  type: string
}
