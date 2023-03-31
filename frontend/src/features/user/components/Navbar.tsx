import { useState } from 'react'
import {
  createStyles,
  Navbar as MantineNavbar,
  getStylesRef,
  rem,
  UnstyledButton,
  Flex,
  Box,
} from '@mantine/core'
import {
  IconLogout,
  IconDashboard,
  IconIcons,
  IconTransferIn,
} from '@tabler/icons-react'
import { IconPassword, IconPlus } from '@tabler/icons-react'
import { useLogout } from 'lib/auth'
import { Link, Outlet, useNavigate } from 'react-router-dom'

const useStyles = createStyles((theme) => ({
  navbar: {
    height: 585,
    [theme.fn.largerThan('md')]: {
      width: 300,
      padding: theme.spacing.md,
    },
    [theme.fn.smallerThan('md')]: {
      width: 75,
      padding: theme.spacing.sm,
    },
  },

  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  link: {
    ...theme.fn.focusStyles(),
    height: 50,
    [theme.fn.smallerThan('md')]: {
      width: 50,
      fontSize: theme.fontSizes.lg,
      justifyContent: 'center',
    },
    [theme.fn.largerThan('md')]: {
      fontSize: theme.fontSizes.sm,
      padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    },
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[1]
        : theme.colors.gray[7],
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,

      [`& .${getStylesRef('icon')}`]: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      },
    },
  },

  linkIcon: {
    ref: getStylesRef('icon'),
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
  },

  linkLabel: {
    marginLeft: theme.spacing.sm,
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({
        variant: 'light',
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
        .color,
      [`& .${getStylesRef('icon')}`]: {
        color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
          .color,
      },
    },
  },
}))

const data = [
  { link: '', label: 'DashBoard', icon: IconDashboard },
  { link: 'profile', label: 'Profile', icon: IconIcons },
  { link: 'password', label: 'Password', icon: IconPassword },
  { link: '', label: 'Transactions', icon: IconTransferIn },
  // { link: 'add', label: 'Add Coupon', icon: IconPlus },
  // { link: '', label: 'Update Coupon', icon: IconIndentIncrease },
]

export function Navbar() {
  const { classes, cx } = useStyles()
  const [active, setActive] = useState('Profile')
  const { mutate, isLoading, isError, isSuccess } = useLogout()
  const navigate = useNavigate()
  if (isSuccess) {
    navigate('/')
    return <div>Success</div>
  }

  const links = data.map((item) => (
    <Link
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
      to={item.link}
      key={item.label}
      onClick={(event) => {
        setActive(item.label)
        navigate('../' + item.link)
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span className={classes.linkLabel}>{item.label}</span>
    </Link>
  ))

  return (
    <Flex
      gap="xl"
      justify="flex-start"
      align="flex-start"
      direction="row"
      wrap="wrap"
    >
      <MantineNavbar className={classes.navbar}>
        <MantineNavbar.Section grow>{links}</MantineNavbar.Section>

        <MantineNavbar.Section className={classes.footer}>
          <UnstyledButton
            disabled={isLoading}
            className={classes.link}
            onClick={(event) => mutate()}
            w="100%"
          >
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <span className={classes.linkLabel}>Logout</span>
          </UnstyledButton>
        </MantineNavbar.Section>
      </MantineNavbar>
      <Box py="md" sx={{ flex: 1, minHeight: '100svh' }}>
        <Outlet />
      </Box>
    </Flex>
  )
}
