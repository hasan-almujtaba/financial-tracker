import React, { useState } from 'react'
import {
  AppShell,
  Navbar,
  Header,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Box,
  useMantineColorScheme,
} from '@mantine/core'
import { DefaultLayout } from '@/types/layout'
import {
  BsFileEarmarkSpreadsheet,
  BsWallet,
  BsArrowLeftRight,
  BsFillStickiesFill,
  BsSunFill,
  BsMoonFill,
} from 'react-icons/bs'
import useStyles from './DashboardLayout.styles'
import ActionButton from '@/components/base/ActionButton/ActionButton'

/**
 * List of link used in navbar
 */
const links = [
  { link: '#', label: 'Report', icon: BsFileEarmarkSpreadsheet },
  { link: '#', label: 'Wallet', icon: BsWallet },
  { link: '#', label: 'Transaction', icon: BsArrowLeftRight },
  { link: '#', label: 'History', icon: BsFillStickiesFill },
]

const DashboardLayout = ({ children }: DefaultLayout) => {
  /**
   * Use mantine theme and color scheme
   */
  const { colors } = useMantineTheme()

  /**
   * Toggle Navbar visibility
   */
  const [opened, setOpened] = useState(false)

  /**
   * Use styles from useStyles variable
   */
  const { classes, cx } = useStyles()

  /**
   * Get and toggle color scheme
   */
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()

  /**
   * Dark mode toggle button tooltip
   */
  const themeTooltip = () =>
    colorScheme === 'dark' ? 'Light Mode' : 'Dark Mode'

  /**
   * State for active link
   */
  const [active, setActive] = useState('Wallet')

  /**
   * Create navigation link list
   */
  const navigationLinks = links.map((item) => (
    <Text<'a'>
      component="a"
      href={item.link}
      key={item.label}
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
      onClick={(event) => {
        event.preventDefault()
        setActive(item.label)
      }}
    >
      <item.icon className={classes.linkIcon}></item.icon>
      <span>{item.label}</span>
    </Text>
  ))

  return (
    <AppShell
      classNames={{
        main: classes.main,
      }}
      fixed
      navbar={
        <Navbar
          hiddenBreakpoint="lg"
          hidden={!opened}
          p="md"
          width={{ lg: 300 }}
        >
          {navigationLinks}
        </Navbar>
      }
      header={
        <Header
          height={70}
          p="md"
        >
          <Box className={classes.headerContainer}>
            <MediaQuery
              largerThan="lg"
              styles={{ display: 'none' }}
            >
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <MediaQuery
              largerThan="md"
              styles={{ display: 'none' }}
            >
              <Box className={classes.spacer}></Box>
            </MediaQuery>

            <Text
              weight="bold"
              size="xl"
            >
              Fin Tracker
            </Text>

            <Box className={classes.spacer}></Box>

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
            </Box>
          </Box>
        </Header>
      }
    >
      {children}
    </AppShell>
  )
}

export default DashboardLayout
