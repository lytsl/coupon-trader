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
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconChevronDown, IconTicket } from '@tabler/icons-react'
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
    link: '/about',
    label: 'Features',
  },
  {
    link: '#1',
    label: 'Learn',
    links: [
      {
        link: '/docs',
        label: 'Documentation',
      },
      {
        link: '/resources',
        label: 'Resources',
      },
      {
        link: '/community',
        label: 'Community',
      },
      {
        link: '/blog',
        label: 'Blog',
      },
    ],
  },
  {
    link: '/about',
    label: 'About',
  },
  {
    link: '/pricing',
    label: 'Pricing',
  },
  {
    link: '#2',
    label: 'Support',
    links: [
      {
        link: '/faq',
        label: 'FAQ',
      },
      {
        link: '/demo',
        label: 'Book a demo',
      },
      {
        link: '/forums',
        label: 'Forums',
      },
    ],
  },
]

export function Header() {
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

  return (
    <Box>
      <MantineHeader height={HEADER_HEIGHT} sx={{ borderBottom: 0 }}>
        <Container className={classes.inner} fluid>
          <Group>
            <IconTicket size={28} />
            <Text
              variant="gradient"
              gradient={{ from: '#9600FF', to: '#AEBAF8' }}
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
            <Button variant="light">Log In</Button>
            <Button>Sign Up</Button>
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
        // TO DO: Input the gradient text
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

          <Group position="center" grow pb="xl" px="md">
            <Button variant="default">Log in</Button>
            <Button>Sign up</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  )
}
