import React, { useState } from 'react'
import {
  AppShell,
  Navbar,
  Header,
  Text,
  MediaQuery,
  Burger,
  Box,
} from '@mantine/core'
import { DefaultLayout } from '@/types/layout'
import useStyles from './DashboardLayout.styles'
import ProfileButton from '@/components/profile/ProfileButton/ProfileButton'
import NavigationLinkGroup from '@/components/navigation/NavigationLinkGroup/NavigationLinkGroup'

const DashboardLayout = ({ children }: DefaultLayout) => {
  /**
   * Toggle Navbar visibility
   */
  const [opened, setOpened] = useState(false)

  /**
   * Use styles from useStyles variable
   */
  const { classes, theme } = useStyles()

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
          <NavigationLinkGroup />
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
                color={theme.colors.gray[6]}
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
              <ProfileButton />
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
