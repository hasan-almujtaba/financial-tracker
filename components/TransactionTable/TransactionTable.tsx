import { supabase } from '@/plugins/supabase'
import { Transaction } from '@/types/transaction'
import { Table, Button, Text, Modal, ScrollArea } from '@mantine/core'
import { useMutation } from 'react-query'
import useStyles from './TransactionTable.styles'
import { showNotification } from '@mantine/notifications'
import { BsCheck } from 'react-icons/bs'
import { useQueryClient } from 'react-query'
import { useFormatter } from '@/hooks/formatter'
import { useModals } from '@mantine/modals'
import { useState } from 'react'
import EditTransactionForm from '@/components/EditTransactionForm/EditTransactionForm'

interface Props {
  transactions: Transaction[]
  type: 'incomes' | 'expenses'
}

const TransactionTable = ({ transactions }: Props) => {
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
    const { error } = await supabase.from('transactions').delete().match({ id })

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
            queryClient.invalidateQueries(['transactions'])
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
   * Edit data container
   */
  const [data, setData] = useState<Transaction>({
    amount: '',
    category: '',
    date: '',
    note: '',
    user_id: '',
    type: '',
  })

  /**
   * Handle edit button click
   */
  const onEditButtonClick = (transaction: Transaction) => {
    setData(transaction)
    setOpened(true)
  }

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
      <td>{currencyFormatter(String(item.amount))}</td>
      <td>{item.category}</td>
      <td>{dateFormatter(item.date as string, 'dddd, DD MMMM YYYY')}</td>
      <td className={classes.actionContainer}>
        <Button
          color="red"
          size="xs"
          onClick={() => onDeleteButtonClick(item.id || '')}
        >
          Delete
        </Button>
        <Button
          color="green"
          size="xs"
          onClick={() => onEditButtonClick(item)}
        >
          Edit
        </Button>
      </td>
    </tr>
  ))

  return (
    <>
      <ScrollArea>
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
      </ScrollArea>

      <Modal
        opened={opened}
        title="Edit Transaction"
        centered
        onClose={() => setOpened(false)}
      >
        <EditTransactionForm
          setOpened={setOpened}
          transaction={data}
        />
      </Modal>
    </>
  )
}

export default TransactionTable
