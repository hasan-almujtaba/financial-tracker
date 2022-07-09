import { useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import {
  Menu,
  UnstyledButton,
  Group,
  Avatar,
  Text,
  Divider,
  useMantineColorScheme,
} from '@mantine/core'
import useStyles from './ProfileButton.styles'
import { BsChevronDown, BsArrowRight, BsSun, BsMoon } from 'react-icons/bs'

const ProfileButton = () => {
  /**
   * Use next auth session hooks
   * @see https://next-auth.js.org/getting-started/client#usesession
   */
  const { data } = useSession()

  /**
   * Use styles from useStyles variable
   */
  const { classes, cx, theme } = useStyles()

  /**
   * Menu open state
   */
  const [opened, setOpened] = useState(false)

  /**
   * Handle user logout
   */
  const onLogoutButtonClick = () => {
    signOut({ callbackUrl: '/' })
  }

  /**
   * Set theme button label based on active color scheme
   */
  const themeLabel = () =>
    theme.colorScheme === 'dark' ? 'Light Mode' : 'Dark Mode'

  /**
   * Set theme icon based on active color scheme
   */
  const themeIcon = () =>
    theme.colorScheme === 'dark' ? <BsSun size={14} /> : <BsMoon size={14} />

  /**
   * Change active color scheme
   */
  const { toggleColorScheme } = useMantineColorScheme()
  const changeTheme = () => toggleColorScheme()

  return (
    <>
      <Menu
        size={200}
        placement="end"
        transition="pop-top-right"
        onClose={() => setOpened(false)}
        onOpen={() => setOpened(true)}
        control={
          <UnstyledButton
            className={cx(classes.user, {
              [classes.userActive]: opened,
            })}
          >
            <Group spacing={7}>
              <Avatar
                src={data?.user.image}
                alt={data?.user.name || ''}
                radius="xl"
                size={20}
              />
              <Text
                weight={500}
                size="sm"
                sx={{ lineHeight: 1 }}
                className={classes.name}
                mr={3}
              >
                {data?.user.name}
              </Text>
              <BsChevronDown size={12} />
            </Group>
          </UnstyledButton>
        }
      >
        <Menu.Item
          icon={themeIcon()}
          onClick={changeTheme}
        >
          {themeLabel()}
        </Menu.Item>

        <Divider />

        <Menu.Item
          color="red"
          icon={<BsArrowRight size={14} />}
          onClick={onLogoutButtonClick}
        >
          Logout
        </Menu.Item>
      </Menu>
    </>
  )
}

export default ProfileButton
