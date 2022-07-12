import { createStyles } from '@mantine/core'

/**
 * Theming with emotion based css-in-js library
 * @see https://mantine.dev/theming/create-styles
 */
const useStyles = createStyles((theme) => ({
  container: {
    marginBottom: theme.spacing.md,
  },

  title: {
    fontSize: theme.fontSizes.xl,
    fontWeight: 700,
  },

  subtitle: {
    fontSize: theme.fontSizes.sm,
  },
}))

export default useStyles
