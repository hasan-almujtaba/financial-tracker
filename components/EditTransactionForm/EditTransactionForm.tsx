import { Button, Select, Textarea, TextInput } from '@mantine/core'
import { z } from 'zod'
import { zodResolver, useForm } from '@mantine/form'
import { DatePicker } from '@mantine/dates'
import useStyles from './EditTransactionForm.styles'
import useCategories from '@/hooks/categories'
import { useMutation, useQueryClient } from 'react-query'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { EditTransactionFormProps, Transaction } from '@/types/transaction'
import { supabase } from '@/plugins/supabase'
import { showNotification } from '@mantine/notifications'
import { BsCheck } from 'react-icons/bs'

const EditTransactionForm = ({
  setOpened,
  transaction,
}: EditTransactionFormProps) => {
  /**
   * Session Hooks
   */
  const { data } = useSession()

  const { classes } = useStyles()

  /**
   * React query client hook
   */
  const queryClient = useQueryClient()

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
        .from('transactions')
        .update(transaction)
        .match({ id: transaction.id })

      if (error) throw error
    }
  )

  /**
   * Form Schema validation
   */
  const validationSchema = z.object({
    amount: z.string(),
    category: z.string(),
    note: z.string(),
    date: z.date(),
  })

  /**
   * Handle form input
   */
  const form = useForm<Transaction>({
    schema: zodResolver(validationSchema),
    initialValues: {
      amount: '',
      category: '',
      note: '',
      date: '',
      type: '',
      user_id: '',
    },
  })

  /**
   * Set values on transactions change
   */

  useEffect(() => {
    const setFormValue = () => {
      setActiveType(transaction.type)

      form.setValues({
        amount: transaction.amount,
        category: transaction.category,
        date: new Date(transaction.date),
        note: transaction.note || '',
        user_id: '',
        type: '',
      })
    }
    setFormValue()
  }, [transaction]) // eslint-disable-line react-hooks/exhaustive-deps

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
      type: activeType,
      id: transaction.id,
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
        queryClient.invalidateQueries(['transactions'])
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
  )
}

export default EditTransactionForm
