import { StateCreator } from 'zustand'
import { Category } from './category'

/**
 * Example slices
 */
export interface ExampleSlice {
  count: number
  increment: () => void
}

/**
 * Category slices
 */
export interface CategorySlice {
  categories: Category[]
  getCategoryLastId: () => number
  addCategory: (category: Category) => void
  removeCategory: (id: number) => void
}

/**
 * Main Store Type
 */
export type Store = ExampleSlice & CategorySlice

/**
 * Store creator type for interdependent slices
 */
export type StoreCreator<T> = StateCreator<
  Store,
  [['zustand/devtools', unknown], ['zustand/persist', unknown]],
  [],
  T
>
