import { supabase } from '@/plugins/supabase'
import { Transaction } from '@/types/transaction'
import { Button, Modal, Select, Textarea, TextInput } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import useStyles from './AddTransaction.styles'
import { showNotification } from '@mantine/notifications'
import { BsCheck } from 'react-icons/bs'
import { z } from 'zod'
import { zodResolver, useForm } from '@mantine/form'
import useCategories from '@/hooks/categories'

const AddTransaction = () => {
  /**
   * Session Hooks
   */
  const { data } = useSession()

  /**
   * React query client hook
   */
  const queryClient = useQueryClient()

  /**
   * Use styles from useStyles variable
   */
  const { classes } = useStyles()

  /**
   * Open state for modal
   */
  const [opened, setOpened] = useState(false)

  /**
   * Transaction type
   */
  const transactionType = ['expense', 'income']
  const [activeType, setActiveType] = useState('expense')

  /**
   * Get categories from reusable hooks
   */
  const categories = useCategories(activeType)

  /**
   * On type change
   */
  const onTypeChange = (value: string) => {
    setActiveType(value || '')

    form.setFieldValue('category', '')
  }

  /**
   * Mutation for add transaction
   */
  const { mutate, isLoading } = useMutation(
    async (transaction: Transaction) => {
      const { error } = await supabase
        .from(`${activeType}s`)
        .insert(transaction)

      if (error) throw error
    }
  )

  /**
   * Form Schema validation
   */
  const validationSchema = z.object({
    amount: z.number(),
    category: z.string(),
    note: z.string(),
    date: z.date(),
  })

  /**
   * Handle form input
   */
  const form = useForm({
    schema: zodResolver(validationSchema),
    initialValues: {
      amount: '',
      category: '',
      note: '',
      date: '',
    },
  })

  /**
   * Handle form submit
   * @param values - Form values
   */
  const onFormSubmit = (values: typeof form.values) => {
    const submitData = {
      amount: values.amount,
      category: values.category,
      note: values.note,
      date: values.date,
      user_id: data?.user.id || '',
    }

    mutate(submitData, {
      onSuccess: () => {
        showNotification({
          title: 'Success',
          message: 'Transaction successfully added',
          icon: <BsCheck size={18} />,
        })
        form.reset()
        setOpened(false)
        console.log(activeType)
        queryClient.invalidateQueries([`${activeType}s`])
      },
      onError: () => {
        showNotification({
          title: 'Failed',
          message: 'Something wrong, please try again later',
          icon: <BsCheck size={18} />,
        })
      },
    })
  }

  return (
    <div className={classes.container}>
      <Button onClick={() => setOpened(true)}>Add Transaction</Button>

      <Modal
        opened={opened}
        title="Add New Transaction"
        centered
        onClose={() => setOpened(false)}
      >
        <form onSubmit={form.onSubmit(onFormSubmit)}>
          <TextInput
            placeholder="Amount"
            label="Transaction Amount"
            {...form.getInputProps('amount')}
            className={classes.input}
            required
            type="number"
          />

          <Select
            placeholder="Type"
            label="Type"
            value={activeType}
            data={transactionType}
            onChange={onTypeChange}
            className={classes.input}
            required
          />

          <Select
            placeholder="Category"
            label="Category"
            data={categories}
            {...form.getInputProps('category')}
            className={classes.input}
            required
          />

          <Textarea
            placeholder="Note"
            label="Note"
            {...form.getInputProps('note')}
            className={classes.input}
            required
          />

          <DatePicker
            placeholder="Pick Date"
            label="Transaction Date"
            required
            className={classes.input}
            {...form.getInputProps('date')}
          />

          <Button
            fullWidth
            type="submit"
            loading={isLoading}
          >
            Save
          </Button>
        </form>
      </Modal>
    </div>
  )
}

export default AddTransaction
