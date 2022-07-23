import { createStyles } from '@mantine/core'

/**
 * Theming with emotion based css-in-js library
 * @see https://mantine.dev/theming/create-styles
 */
const useStyles = createStyles(() => ({
  container: {
    marginBottom: '20px',
  },

  input: {
    marginBottom: '15px',
  },
}))

export default useStyles
