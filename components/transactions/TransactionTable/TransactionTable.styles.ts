import { createStyles } from '@mantine/core'

/**
 * Theming with emotion based css-in-js library
 * @see https://mantine.dev/theming/create-styles
 */
const useStyles = createStyles((theme) => ({
  table: {
    overflow: 'auto',
  },

  empty: {
    textAlign: 'center',
  },

  actionContainer: {
    display: 'flex',
    columnGap: '10px',

    [theme.fn.smallerThan('md')]: {
      rowGap: '10px',
      flexDirection: 'column',
    },
  },

  input: {
    marginBottom: '15px',
  },
}))

export default useStyles
