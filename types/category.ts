export interface Category {
  id: number
  name: string
  type: string
}

export interface CategoryTableRowProps extends Category {
  removeCategory: (id: number) => void
}
