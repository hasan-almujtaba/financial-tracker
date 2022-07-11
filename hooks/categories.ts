import { useEffect, useState } from 'react'
import useStore from 'store'

const useCategories = (activeType: string) => {
  /**
   * Categories from zustand
   */
  const categoriesState = useStore((state) => state.categories)

  /**
   * Local state containing data from zustand
   */
  const [categories, setCategories] = useState<string[]>([])

  /**
   * Set categories on mounted
   */
  useEffect(() => {
    const formatCategories = () => {
      const filteredCategories = categoriesState.filter(
        (item) => item.type === activeType
      )
      const formattedCategories = filteredCategories.map((item) => item.name)

      setCategories(formattedCategories)
    }

    formatCategories()
  }, [activeType, categoriesState])

  return categories
}

export default useCategories
