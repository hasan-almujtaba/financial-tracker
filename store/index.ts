import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { Store } from '../types/store'
import createCategory from './category'

/**
 * Create Store
 * See https://github.com/pmndrs/zustand/blob/main/docs/typescript.md
 */
const useStore = create<Store>()(
  devtools(
    persist(
      (...a) => ({
        ...createCategory(...a),
      }),
      {
        name: 'finn-tracker-zustand',
      }
    )
  )
)

export default useStore
