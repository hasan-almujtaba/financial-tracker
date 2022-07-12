import { createStyles } from '@mantine/core'

const useStyles = createStyles((theme) => ({
  container: {
    position: 'relative',
    height: 'auto',

    [theme.fn.largerThan('md')]: {
      width: '60vw',
    },
  },
}))

export default useStyles
