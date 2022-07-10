import { Category } from '@/types/category'
import { CategorySlice, StoreCreator } from '@/types/store'

const defaultCategories = [
  {
    id: 1,
    name: 'Food & Beverage',
    type: 'expense',
  },
  {
    id: 2,
    name: 'Transportation',
    type: 'expense',
  },
  {
    id: 3,
    name: 'Rentals',
    type: 'expense',
  },
  {
    id: 4,
    name: 'Water Bill',
    type: 'expense',
  },
  {
    id: 5,
    name: 'Phone Bill',
    type: 'expense',
  },
  {
    id: 6,
    name: 'Electricity Bill',
    type: 'expense',
  },
  {
    id: 7,
    name: 'Gas Bill',
    type: 'expense',
  },
  {
    id: 8,
    name: 'Television Bill',
    type: 'expense',
  },
  {
    id: 9,
    name: 'Internet Bill',
    type: 'expense',
  },
  {
    id: 10,
    name: 'Other Utility Bill',
    type: 'expense',
  },
  {
    id: 11,
    name: 'Home Maintenance',
    type: 'expense',
  },
  {
    id: 12,
    name: 'Vehicle Maintenance',
    type: 'expense',
  },
  {
    id: 13,
    name: 'Medical Check up',
    type: 'expense',
  },
  {
    id: 14,
    name: 'Insurances',
    type: 'expense',
  },
  {
    id: 15,
    name: 'Education',
    type: 'expense',
  },

  {
    id: 16,
    name: 'Collect Interest',
    type: 'income',
  },
  {
    id: 17,
    name: 'Salary',
    type: 'income',
  },
  {
    id: 18,
    name: 'Other Income',
    type: 'income',
  },
  {
    id: 19,
    name: 'Incoming Transfer',
    type: 'income',
  },
]

/**
 * Create independent slice
 * @param set - Set new value
 * @param get - Get value from store
 */
const createCategory: StoreCreator<CategorySlice> = (set, get) => ({
  categories: [...defaultCategories],
  getCategoryLastId: () => {
    const categories = get().categories
    const lastId =
      categories.length !== 0 ? categories[categories.length - 1].id : 0

    return lastId
  },
  addCategory: (newCategory: Category) => {
    set(
      (prev) => ({
        categories: [newCategory, ...prev.categories],
      }),
      false,
      'category/addCategory'
    )
  },
  removeCategory: (id: number) => {
    set(
      (prev) => ({
        categories: prev.categories.filter((category) => category.id !== id),
      }),
      false,
      'category/removeCategory'
    )
  },
})

export default createCategory
