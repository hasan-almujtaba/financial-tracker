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
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },

    header: {
      display: 'flex',
      alignItems: 'center',
      height: '100%',
      justifyContent: 'space-between',
    },

    actionGroup: {
      display: 'flex',
      columnGap: theme.spacing.sm,
    },

    spacer: {
      flexGrow: 1,
    },
  }
})

export default useStyles
