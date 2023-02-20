import { createStyles, Anchor, Group, ActionIcon, Text } from '@mantine/core'
import {
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram,
  IconTicket,
} from '@tabler/icons-react'

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: 120,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  // info: {
  //   marginBottom: theme.spacing.xs * 1.5,
  //   [theme.fn.smallerThan('sm')]: {
  //     flexDirection: 'column',
  //   },
  // },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `${theme.spacing.md}px ${theme.spacing.md}px`,

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
    },
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.lg,
      marginBottom: theme.spacing.sm,
    },
  },
}))

interface FooterCenteredProps {
  links: { link: string; label: string }[]
}

const links: FooterCenteredProps['links'] = [
  {
    link: '#',
    label: 'Contact',
  },
  {
    link: '#',
    label: 'Privacy',
  },
  {
    link: '#',
    label: 'Blog',
  },
  {
    link: '#',
    label: 'Careers',
  },
]

export function Footer() {
  const { classes } = useStyles()
  const items = links.map((link) => (
    <Anchor<'a'>
      color="dimmed"
      key={link.label}
      href={link.link}
      sx={{ lineHeight: 1 }}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ))

  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
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
        <Group className={classes.links}>{items}</Group>

        <Group spacing="xs" position="right" noWrap>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandTwitter size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandYoutube size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandInstagram size={18} stroke={1.5} />
          </ActionIcon>
        </Group>
      </div>
      {/* <div className={classes.info}>
        <Text align="center" fz="xs" fw={10} fs="italic" c="dimmed">
          Copyright 2023 Coupon Tader | All Rights Reserved
        </Text>
      </div> */}
    </div>
  )
}
