import { Button, Modal, Select, TextInput } from '@mantine/core'
import { useForm } from '@mantine/hooks'
import { showNotification } from '@mantine/notifications'
import { useState } from 'react'
import { BsCheck } from 'react-icons/bs'
import useStore from 'store'
import useStyles from './AddCategory.styles'

const AddCategory = () => {
  /**
   * Use styles from useStyles variable
   */
  const { classes } = useStyles()

  /**
   * Zustand state for getting las id on store
   */
  const lastId = useStore((state) => state.getCategoryLastId)
  const addCategory = useStore((state) => state.addCategory)

  /**
   * Open state for modal
   */
  const [opened, setOpened] = useState(false)

  /**
   * Select Option
   */
  const selectOptions = [
    { value: 'expense', label: 'Expense' },
    { value: 'income', label: 'Income' },
  ]

  /**
   * Handle form input
   */
  const form = useForm({
    initialValues: {
      name: '',
      type: '',
    },
  })

  /**
   * Store new category on form submit
   * @param values - Form value
   */
  const onFormSubmit = (values: typeof form.values) => {
    const categoryLastId = lastId()
    const newCategory = {
      id: categoryLastId + 1,
      name: values.name,
      type: values.type,
    }

    addCategory(newCategory)

    setTimeout(() => {
      showNotification({
        title: 'Success',
        message: 'Category successfully added',
        icon: <BsCheck size={18} />,
      })
    }, 500)

    setOpened(false)
    form.reset()
  }

  return (
    <div className={classes.container}>
      <Button onClick={() => setOpened(true)}>Add Category</Button>

      <Modal
        opened={opened}
        title="Add New Category"
        centered
        onClose={() => setOpened(false)}
      >
        <form onSubmit={form.onSubmit(onFormSubmit)}>
          <TextInput
            className={classes.input}
            placeholder="Name"
            label="Category Name"
            {...form.getInputProps('name')}
          />
          <Select
            placeholder="Type"
            label="Category Type"
            data={selectOptions}
            className={classes.input}
            {...form.getInputProps('type')}
          />

          <Button
            fullWidth
            type="submit"
          >
            Save
          </Button>
        </form>
      </Modal>
    </div>
  )
}

export default AddCategory
