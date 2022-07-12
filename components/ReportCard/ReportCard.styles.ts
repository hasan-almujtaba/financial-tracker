import { createStyles } from '@mantine/core'

const useStyles = createStyles((theme) => ({
  card: {
    width: '300px',
    borderRadius: '10px',
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.blue[2]
        : theme.colors.blue[3],
    color: theme.colorScheme === 'dark' ? theme.colors.gray[7] : theme.black,

    [theme.fn.smallerThan('md')]: {
      width: '100%',
    },
  },

  title: {
    marginBottom: theme.spacing.md,
  },
}))

export default useStyles
