//todo fix header links
import {
  createStyles,
  Menu,
  Center,
  Header as MantineHeader,
  Container,
  Group,
  Button,
  Burger,
  Box,
  Drawer,
  Collapse,
  ScrollArea,
  Divider,
  UnstyledButton,
  Stack,
  Text,
  Loader,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import {
  IconChevronDown,
  IconTicket,
  IconUserCircle,
} from '@tabler/icons-react'
import { Suspense } from 'react'
import { useNavigate } from 'react-router-dom'
import { ThemeSwitch } from './ThemeSwitch'

const HEADER_HEIGHT = 60

const useStyles = createStyles((theme) => ({
  inner: {
    height: HEADER_HEIGHT,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  hiddenMobile: {
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan('md')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkLabel: {
    marginRight: 5,
  },
}))

const links = [
  {
    link: '#',
    label: 'Explore',
  },
  {
    link: '#',
    label: 'About',
  },
  {
    link: '#',
    label: 'Inquiry',
  },
  {
    link: '#2',
    label: 'members',
    links: [
      {
        link: '#',
        label: 'Ayush Sakariya',
      },
      {
        link: '#',
        label: 'Sanket Detroja',
      },
      {
        link: '#',
        label: 'Ayush Savani',
      },
      {
        link: '#',
        label: 'Harshil Buha',
      },
    ],
  },
]

export function Header(props: { hasLoggedIn: boolean }) {
  const { hasLoggedIn } = props
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false)
  const { classes, theme } = useStyles()
  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>{item.label}</Menu.Item>
    ))

    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" exitTransitionDuration={0}>
          <Menu.Target>
            <UnstyledButton
              // href={link.link}
              className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size={12} stroke={1.5} />
              </Center>
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      )
    }

    return (
      <a
        key={link.label}
        href={link.link}
        className={classes.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </a>
    )
  })

  const mItems = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <a
        href={item.link}
        className={classes.link}
        onClick={(event) => event.preventDefault()}
      >
        <Center>{item.label}</Center>
      </a>
    ))

    if (menuItems) {
      const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false)
      return (
        <Stack align="center" spacing={0} justify="flex-start">
          <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center>
              <span className={classes.linkLabel}>{link.label}</span>
              <IconChevronDown size={12} stroke={1.5} />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}>{menuItems}</Collapse>
        </Stack>
      )
    }

    return (
      <a
        href={link.link}
        className={classes.link}
        onClick={(event) => event.preventDefault()}
      >
        <Center> {link.label}</Center>
      </a>
    )
  })

  const navigate = useNavigate()

  return (
    <Suspense
      fallback={
        <Center>
          <Loader size="xl" />
        </Center>
      }
    >
      <MantineHeader height={HEADER_HEIGHT} sx={{ borderBottom: 0 }}>
        <Container className={classes.inner} fluid>
          <Group>
            <IconTicket size={32} stroke={1.1} color="#AEBAF8" />
            <Text
              variant="gradient"
              gradient={{ from: '#9600FF', to: '#AEBAF8', deg: 0 }}
              sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
              ta="center"
              fz="xl"
              fw={700}
            >
              Coupon Trader
            </Text>
          </Group>
          <Group spacing={5} className={classes.hiddenMobile}>
            {items}
          </Group>
          <Group className={classes.hiddenMobile}>
            <ThemeSwitch />
            {hasLoggedIn ? (
              <IconUserCircle size={32} stroke={1.1} color="#AEBAF8" />
            ) : (
              <>
                <Button variant="light" onClick={(e) => navigate('auth/login')}>
                  Log In
                </Button>
                <Button onClick={(e) => navigate('auth/register')}>
                  Sign Up
                </Button>
              </>
            )}
          </Group>
          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            className={classes.hiddenDesktop}
            size="sm"
          />
        </Container>
      </MantineHeader>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title={'Navigate'}
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ThemeSwitch height={HEADER_HEIGHT} />
        <ScrollArea sx={{ height: 'calc(100vh - 120px)' }} mx="-md">
          <Divider
            mb="sm"
            color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}
          />
          {mItems}
          <Divider
            my="sm"
            color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}
          />
          {hasLoggedIn ? (
            <IconUserCircle size={32} stroke={1.1} color="#AEBAF8" />
          ) : (
            <>
              <Group position="center" grow pb="xl" px="md">
                <Button
                  onClick={(e) => navigate('auth/login')}
                  variant="default"
                >
                  Log in
                </Button>
                <Button onClick={(e) => navigate('auth/register')}>
                  Sign up
                </Button>
              </Group>
            </>
          )}
        </ScrollArea>
      </Drawer>
    </Suspense>
  )
}
