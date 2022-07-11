import { supabase } from '@/plugins/supabase'
import { TransactionTable } from '@/types/transaction'
import { Table, Button, Text, Modal } from '@mantine/core'
import { useMutation } from 'react-query'
import useStyles from './TransactionTable.styles'
import { showNotification } from '@mantine/notifications'
import { BsCheck } from 'react-icons/bs'
import { useQueryClient } from 'react-query'
import { useFormatter } from '@/hooks/formatter'
import { useModals } from '@mantine/modals'
import { useState } from 'react'

const TransactionTable = ({ transactions, type }: TransactionTable) => {
  /**
   * Use styles from useStyles variable
   */
  const { classes } = useStyles()

  /**
   * React query client hook
   */
  const queryClient = useQueryClient()

  /**
   * Formatter
   */
  const { currencyFormatter, dateFormatter } = useFormatter()

  /**
   * Hooks for using modal
   */
  const modals = useModals()

  /**
   * Mutation for delete transaction
   */
  const deleteTransaction = useMutation(async (id: string) => {
    const { error } = await supabase.from(type).delete().match({ id })

    if (error) throw error
  })

  /**
   * Delete button click handler
   */
  const onDeleteButtonClick = (id: string) => {
    modals.openConfirmModal({
      title: 'Delete Transaction?',
      labels: { confirm: 'Yes, Delete it', cancel: 'Cancel' },
      children: <Text size="sm">This action will remove related data</Text>,
      onConfirm: () => {
        deleteTransaction.mutate(id, {
          onSuccess: () => {
            showNotification({
              title: 'Success',
              message: 'Transaction successfully deleted',
              icon: <BsCheck size={18} />,
            })
            queryClient.invalidateQueries([type])
          },
        })
      },
    })
  }

  /**
   * Open state for edit modal
   */
  const [opened, setOpened] = useState(false)

  /**
   * Table placeholder on empty data
   */
  const empty = (
    <tr>
      <td
        colSpan={3}
        className={classes.empty}
      >
        Data Unavailable
      </td>
    </tr>
  )

  /**
   * Transaction Row
   */
  const transactionRow = transactions.map((item, i) => (
    <tr key={i}>
      <td>{currencyFormatter(item.amount)}</td>
      <td>{item.category}</td>
      <td>{dateFormatter(item.date, 'dddd, DD MMMM YYYY')}</td>
      <td className={classes.actionContainer}>
        <Button
          color="red"
          onClick={() => onDeleteButtonClick(item.id || '')}
        >
          Delete
        </Button>
        <Button color="green">Edit</Button>
      </td>
    </tr>
  ))

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{transactions.length === 0 ? empty : transactionRow}</tbody>
      </Table>

      <Modal
        opened={opened}
        title="Edit Transaction"
        centered
        onClose={() => setOpened(false)}
      >
        <form></form>
      </Modal>
    </>
  )
}

export default TransactionTable
