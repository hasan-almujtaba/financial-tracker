import { createStyles } from '@mantine/core'

/**
 * Theming with emotion based css-in-js library
 * @see https://mantine.dev/theming/create-styles
 */
const useStyles = createStyles(() => ({
  empty: {
    textAlign: 'center',
  },

  actionContainer: {
    display: 'flex',
    columnGap: '10px',
  },

  input: {
    marginBottom: '15px',
  },
}))

export default useStyles
