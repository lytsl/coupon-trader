import { Container, Title, Accordion, createStyles, Text } from '@mantine/core'

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: theme.spacing.xl * 2,
    paddingBottom: theme.spacing.xl * 2,
    minHeight: 650,
  },

  title: {
    marginBottom: theme.spacing.xl * 1.5,
  },

  info: {
    marginBottom: theme.spacing.lg * 1.5,
  },

  item: {
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing.lg,

    border: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}))

export function Faq() {
  const { classes } = useStyles()
  return (
    <Container size="sm" className={classes.wrapper}>
      <Title align="center" className={classes.title}>
        Frequently Asked Questions
      </Title>
      <Text align="center" c="dimmed" className={classes.info}>
        Here you can read the most questions asked by people to ease their
        productivity through our platform. Moreover, you can also understand the
        motto of our platform
      </Text>

      <Accordion variant="separated">
        <Accordion.Item className={classes.item} value="working">
          <Accordion.Control>
            How does the coupon trader work?
          </Accordion.Control>
          <Accordion.Panel>
            Our coupon trader allows you to buy and sell vouchers easily. To
            sell a coupon, simply list it on our platform with the desired
            price. Buyers can then purchase the coupon and use it at the
            specified store or website.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="security">
          <Accordion.Control>Is the platform secure?</Accordion.Control>
          <Accordion.Panel>
            Yes, we take security very seriously. Our platform is designed with
            the latest security features to protect your personal and financial
            information. We use encryption technologies and other measures to
            ensure that all transactions are safe and secure.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="withdrawal">
          <Accordion.Control>Can I withdraw my earnings?</Accordion.Control>
          <Accordion.Panel>
            Yes, you can withdraw your earnings at any time. Simply go to your
            account settings and select the withdrawal option. We offer various
            payment methods to make it easy for you to receive your earnings.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="payment-options">
          <Accordion.Control>
            What payments options are available?
          </Accordion.Control>
          <Accordion.Panel>
            We offer several payment options. Choose the option that works best
            for you and enjoy a seamless shopping experience.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="coupons-for-sale">
          <Accordion.Control>
            How do I list a coupon for sale?
          </Accordion.Control>
          <Accordion.Panel>
            To list a coupon for sale, simply go to your account and select the
            "Sell" option. Enter the details of the coupon, including the brand
            or store, the discount amount, and the expiration date. Set the
            desired price and submit the listing. Your coupon will then be
            available for purchase by other users.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="verified-coupons">
          <Accordion.Control>Are the coupons verified?</Accordion.Control>
          <Accordion.Panel>
            Yes, we verify all the coupons listed on our platform to ensure that
            they are valid and up-to-date
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Container>
  )
}
