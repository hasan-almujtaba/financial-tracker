import { createStyles } from '@mantine/core'

const useStyles = createStyles((theme) => ({
  name: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  user: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: 'background-color 100ms ease',

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[3],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  userActive: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.fn.rgba(theme.colors[theme.primaryColor][8], 0.25)
        : theme.colors[theme.primaryColor][0],
    color:
      theme.colorScheme === 'dark'
        ? theme.white
        : theme.colors[theme.primaryColor][7],
  },
}))

export default useStyles
