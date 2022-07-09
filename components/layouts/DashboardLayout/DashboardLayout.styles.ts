import { createStyles } from '@mantine/core'

/**
 * Theming with emotion based css-in-js library
 * @see https://mantine.dev/theming/create-styles
 */
const useStyles = createStyles((theme) => {
  return {
    main: {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
    },

    headerContainer: {
      display: 'flex',
      alignItems: 'center',
      height: '100%',
    },

    actionGroup: {
      display: 'flex',
      columnGap: theme.spacing.sm,
      alignItems: 'center',
    },

    spacer: {
      flexGrow: 1,
    },
  }
})

export default useStyles
