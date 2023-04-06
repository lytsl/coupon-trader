import { createStyles, Anchor, Group, ActionIcon, Text, rem } from '@mantine/core'
import {
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram,
  IconTicket,
} from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'

const useStyles = createStyles((theme) => ({
  footer: {
    // marginTop: rem(10),
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `${theme.spacing.md} ${theme.spacing.md}`,

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

// interface FooterCenteredProps {
//   links: { link: string; label: string }[]
// }

// const links: FooterCenteredProps['links'] = [
//   {
//     link: '/app/coupon/add',
//     label: 'Add Coupon',
//   },
//   {
//     link: '/explore',
//     label: 'Explore',
//   },
//   {
//     link: '/inquiry',
//     label: 'Inquiry',
//   },
//   {
//     link: '#',
//     label: 'About',
//   },
// ]

export function Footer() {
  const { classes } = useStyles()
  const navigate = useNavigate()

  // const items = links.map((link) => (
  //   <Anchor<'a'>
  //     color="dimmed"
  //     key={link.label}
  //     href={link.link}
  //     sx={{ lineHeight: 1 }}
  //     onClick={(event) => navigate(link.link)}
  //     size="sm"
  //   >
  //     {link.label}
  //   </Anchor>
  // ))

  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
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
        {/* <Group className={classes.links}>{items}</Group> */}
        <div className={classes.links}>
          <Text align="center" fz="sm" fw={10} c="dimmed">
            Copyright 2023 Coupon Trader | All Rights Reserved
          </Text>
        </div>

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
    </div>
  )
}
