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
  Drawer,
  Collapse,
  ScrollArea,
  Divider,
  UnstyledButton,
  Stack,
  Text,
  rem,
  Anchor,
  Box,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconChevronDown, IconTicket, IconUserCircle } from '@tabler/icons-react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ThemeSwitch } from './ThemeSwitch'

const links = [
  {
    link: '/app/coupon/add',
    label: 'Add Coupon',
  },
  {
    link: '/explore',
    label: 'Explore',
  },
  {
    link: '/inquiry',
    label: 'Inquiry',
  },
  {
    link: '#',
    label: 'About',
  },
  // {
  //   link: '#2',
  //   label: 'members',
  //   links: [
  //     {
  //       link: '#',
  //       label: 'Ayush Sakariya',
  //     },
  //     {
  //       link: '#',
  //       label: 'Sanket Detroja',
  //     },
  //     {
  //       link: '#',
  //       label: 'Ayush Savani',
  //     },
  //     {
  //       link: '#',
  //       label: 'Harshil Buha',
  //     },
  //   ],
  // },
]

export const HEADER_HEIGHT = 60

const useStyles = createStyles((theme) => ({
  header: {
    zIndex: 10,
    position: 'sticky',
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },
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
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  linkLabel: {
    marginRight: 5,
  },
}))

export function Header(props: { hasLoggedIn: boolean; sx: any }) {
  const { hasLoggedIn, sx } = props

  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false)
  const { classes, theme } = useStyles()
  const navigate = useNavigate()

  const items = links.map((link) => {
    // const menuItems = link.links?.map((item) => (
    //   <Menu.Item key={item.label}>{item.label}</Menu.Item>
    // ))

    // if (menuItems) {
    //   return (
    //     <Menu
    //       key={link.label}
    //       trigger="hover"
    //       transitionProps={{ exitDuration: 0 }}
    //       withinPortal
    //     >
    //       <Menu.Target>
    //         <UnstyledButton
    //           // href={link.link}
    //           className={classes.link}
    //           onClick={(event) => event.preventDefault()}
    //         >
    //           <Center>
    //             <span className={classes.linkLabel}>{link.label}</span>
    //             <IconChevronDown size={12} stroke={1.5} />
    //           </Center>
    //         </UnstyledButton>
    //       </Menu.Target>
    //       <Menu.Dropdown>{menuItems}</Menu.Dropdown>
    //     </Menu>
    //   )
    // }

    return (
      <Link
        key={link.label}
        to={link.link}
        className={classes.link}
        // onClick={(event) => navigate(link.link)}
      >
        {link.label}
      </Link>
    )
  })

  const mItems = links.map((link) => {
    // const menuItems = link.links?.map((item) => (
    //   <a
    //     href={item.link}
    //     className={classes.link}
    //     onClick={(event) => event.preventDefault()}
    //     key={item.label}
    //   >
    //     <Center>{item.label}</Center>
    //   </a>
    // ))

    // if (menuItems) {
    //   const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false)
    //   return (
    //     <Stack key={link.label} align="center" spacing={0} justify="flex-start">
    //       <UnstyledButton className={classes.link} onClick={toggleLinks}>
    //         <Center>
    //           <span className={classes.linkLabel}>{link.label}</span>
    //           <IconChevronDown size={12} stroke={1.5} />
    //         </Center>
    //       </UnstyledButton>
    //       <Collapse in={linksOpened}>{menuItems}</Collapse>
    //     </Stack>
    //   )
    // }

    return (
      <a
        key={link.label}
        href={link.link}
        className={classes.link}
        onClick={(event) => navigate(link.link)}
      >
        <Center> {link.label}</Center>
      </a>
    )
  })

  return (
    <Box className={classes.header} sx={sx}>
      <MantineHeader height={HEADER_HEIGHT} sx={{ borderBottom: 0 }}>
        <Container className={classes.inner} fluid>
          <Group onClick={(e) => navigate('/')}>
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
              <IconUserCircle
                size={32}
                stroke={1.1}
                color="#AEBAF8"
                onClick={(e) => navigate('/app/user/profile')}
              />
            ) : (
              <>
                <Button variant="light" onClick={(e) => navigate('/auth/login')}>
                  Log In
                </Button>
                <Button onClick={(e) => navigate('/auth/register')}>Sign Up</Button>
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
          <Divider mb="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />
          {mItems}
          <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />
          {hasLoggedIn ? (
            <IconUserCircle
              size={32}
              stroke={1.1}
              color="#AEBAF8"
              onClick={(e) => navigate('/app/user/profile')}
            />
          ) : (
            <>
              <Group position="center" grow pb="xl" px="md">
                <Button onClick={(e) => navigate('/auth/login')} variant="default">
                  Log in
                </Button>
                <Button onClick={(e) => navigate('/auth/register')}>Sign up</Button>
              </Group>
            </>
          )}
        </ScrollArea>
      </Drawer>
    </Box>
  )
}
