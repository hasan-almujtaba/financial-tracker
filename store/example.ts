import { StateCreator } from 'zustand'
import { ExampleSlice, Store } from '@/types/store'

/**
 * Create independent slice
 * @param set - Set new value
 * @param get - Get value from store
 */
const createExample: StateCreator<
  Store,
  [['zustand/devtools', unknown], ['zustand/persist', unknown]],
  [],
  ExampleSlice
> = (set) => ({
  count: 0,
  increment: () => {
    set((prev) => ({ count: prev.count + 1 }), false)
  },
})

export default createExample
