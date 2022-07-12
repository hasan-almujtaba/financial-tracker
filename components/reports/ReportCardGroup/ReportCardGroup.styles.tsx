import { createStyles } from '@mantine/core'

const useStyles = createStyles((theme) => ({
  container: {
    display: 'flex',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.md,

    [theme.fn.smallerThan('md')]: {
      flexDirection: 'column',
    },
  },
}))

export default useStyles
