import { CategoryTableRowProps } from '@/types/category'
import { Button, Text } from '@mantine/core'
import { useModals } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import { BsCheck } from 'react-icons/bs'
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
   * Hooks for using modal
   */
  const modals = useModals()

  /**
   * Remove category from store
   */
  const onDeleteButtonClick = () => {
    modals.openConfirmModal({
      title: 'Delete Category?',
      labels: { confirm: 'Yes, Delete it', cancel: 'Cancel' },
      children: (
        <Text size="sm">This action will remove selected category</Text>
      ),
      onConfirm: () => {
        removeCategory(id)
        setTimeout(() => {
          showNotification({
            title: 'Success',
            message: 'Category successfully deleted',
            icon: <BsCheck size={18} />,
          })
        }, 500)
      },
    })
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
