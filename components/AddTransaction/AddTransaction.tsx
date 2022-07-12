import { Button, Modal } from '@mantine/core'
import { useState } from 'react'
import useStyles from './AddTransaction.styles'
import CreateTransactionForm from '@/components/CreateTransactionForm/CreateTransactionForm'

const AddTransaction = () => {
  /**
   * Use styles from useStyles variable
   */
  const { classes } = useStyles()

  /**
   * Open state for modal
   */
  const [opened, setOpened] = useState(false)

  return (
    <div className={classes.container}>
      <Button onClick={() => setOpened(true)}>Add Transaction</Button>

      <Modal
        opened={opened}
        title="Add New Transaction"
        centered
        onClose={() => setOpened(false)}
      >
        <CreateTransactionForm setOpened={setOpened} />
      </Modal>
    </div>
  )
}

export default AddTransaction
