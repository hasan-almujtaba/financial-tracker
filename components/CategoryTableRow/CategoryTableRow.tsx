import { CategoryTableRowProps } from '@/types/category'
import { Button } from '@mantine/core'
import useStyles from './CategoryTableRow.styles'

const CategoryTableRow = ({
  name,
  type,
  id,
  removeCategory,
}: CategoryTableRowProps) => {
  /**
   * Use styles from useStyles variable
   */
  const { classes } = useStyles()

  /**
   * Remove category from store
   */
  const onDeleteButtonClick = () => {
    removeCategory(id)
  }

  return (
    <tr>
      <td>{name}</td>
      <td className={classes.type}>{type}</td>
      <td>
        <Button
          color="red"
          onClick={onDeleteButtonClick}
        >
          Delete
        </Button>
      </td>
    </tr>
  )
}

export default CategoryTableRow
