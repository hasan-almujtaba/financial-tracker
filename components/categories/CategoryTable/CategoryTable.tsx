import { Category } from '@/types/category'
import { Table } from '@mantine/core'
import { useEffect, useState } from 'react'
import useStore from 'store'
import CategoryTableRow from '../CategoryTableRow/CategoryTableRow'
import useStyles from './CategoryTable.styles'

const CategoryTable = () => {
  /**
   * Use styles from useStyles variable
   */
  const { classes } = useStyles()

  /**
   * Zustand state selector
   */
  const categoriesState = useStore((state) => state.categories)
  const removeCategory = useStore((state) => state.removeCategory)

  /**
   * Local state for contain value from zustand
   */
  const [categories, setCategories] = useState<Category[]>([])

  /**
   * Set persisted zustand state on mounted
   */
  useEffect(() => {
    setCategories(categoriesState)
  }, [categoriesState])

  /**
   * Categories row
   */
  const categoriesRow = categories.map((item, i) => (
    <CategoryTableRow
      removeCategory={removeCategory}
      {...item}
      key={i}
    />
  ))

  /**
   * Table placeholder on empty data
   */
  const empty = (
    <tr>
      <td
        colSpan={3}
        className={classes.empty}
      >
        Category Unavailable
      </td>
    </tr>
  )

  return (
    <div>
      <Table verticalSpacing="md">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{categories.length === 0 ? empty : categoriesRow}</tbody>
      </Table>
    </div>
  )
}

export default CategoryTable
