import { DefaultLayout } from '@/types/layout'
import {
  AppShell,
  Header,
  Text,
  useMantineColorScheme,
  Box,
} from '@mantine/core'
import useStyles from './DefaultLayout.styles'
import ActionButton from '@/components/ActionButton/ActionButton'
import { BsGithub, BsSunFill, BsMoonFill } from 'react-icons/bs'

const DefaultLayout = ({ children }: DefaultLayout) => {
  /**
   * Use styles from useStyles variable
   */
  const { classes } = useStyles()

  /**
   * Get and toggle color scheme
   */
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()

  /**
   * Dark mode toggle button tooltip
   */
  const themeTooltip = () =>
    colorScheme === 'dark' ? 'Light Mode' : 'Dark Mode'

  return (
    <AppShell
      classNames={{
        main: classes.main,
      }}
      fixed
      header={
        <Header
          height={70}
          p="md"
        >
          <Box className={classes.header}>
            <Text
              weight="bold"
              size="xl"
            >
              Fin Tracker
            </Text>

            <Box className={classes.actionGroup}>
              <ActionButton
                onClick={() => toggleColorScheme()}
                tooltip={themeTooltip()}
              >
                {colorScheme === 'dark' ? (
                  <BsSunFill size="18" />
                ) : (
                  <BsMoonFill size="18" />
                )}
              </ActionButton>
              <ActionButton
                tooltip="View Source Code"
                link="https://github.com/hasan-almujtaba/financial-tracker"
                target="_blank"
              >
                <BsGithub size={18} />
              </ActionButton>
            </Box>
          </Box>
        </Header>
      }
    >
      {children}
    </AppShell>
  )
}

export default DefaultLayout
