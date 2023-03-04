import { useState } from 'react'
import {
  createStyles,
  Navbar as MantineNavbar,
  Group,
  Text,
  getStylesRef,
  rem,
  UnstyledButton,
} from '@mantine/core'
import {
  IconSwitchHorizontal,
  IconLogout,
  IconTicket,
  IconDashboard,
  IconIcons,
  IconTransferIn,
} from '@tabler/icons-react'
import { IconIndentIncrease, IconPassword, IconPlus } from '@tabler/icons-react'
import { useLogout } from 'lib/auth'
import { useNavigate } from 'react-router-dom'

const useStyles = createStyles((theme) => ({
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
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[1]
        : theme.colors.gray[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
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
    marginRight: theme.spacing.sm,
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
  { link: '', label: 'Profile', icon: IconIcons },
  { link: '', label: 'Password', icon: IconPassword },
  { link: '', label: 'Transactions', icon: IconTransferIn },
  { link: '', label: 'Add Coupon', icon: IconPlus },
  { link: '', label: 'Update Coupon', icon: IconIndentIncrease },
]

export function Navbar() {
  const { classes, cx } = useStyles()
  const [active, setActive] = useState('Billing')
  const { mutate, isLoading, isError, isSuccess } = useLogout()
  const navigate = useNavigate()
  if (isSuccess) {
    navigate('/')
    return <div>Success</div>
  }

  const links = data.map((item) => (
    <a
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault()
        setActive(item.label)
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ))

  return (
    <MantineNavbar height={600} width={{ sm: 300 }} p="md">
      <MantineNavbar.Section grow>{links}</MantineNavbar.Section>

      <MantineNavbar.Section className={classes.footer}>
        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a>

        <UnstyledButton
          disabled={isLoading}
          className={classes.link}
          onClick={(event) => mutate()}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </UnstyledButton>
      </MantineNavbar.Section>
    </MantineNavbar>
  )
}
