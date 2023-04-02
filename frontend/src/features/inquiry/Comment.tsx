import {
  createStyles,
  Text,
  Avatar,
  Group,
  TypographyStylesProvider,
  Paper,
  rem,
  Card,
} from '@mantine/core'

const useStyles = createStyles((theme) => ({
  comment: {
    padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
    position: 'relative',
  },

  body: {
    paddingLeft: rem(54),
    paddingTop: theme.spacing.sm,
    fontSize: theme.fontSizes.sm,
  },

  content: {
    '& > p:last-child': {
      marginBottom: 0,
    },
  },
}))

interface CommentHtmlProps {
  body: string
  author: {
    name: string
    username: string
    image: string
  }
}

export function Comment({ body, author }: CommentHtmlProps) {
  const { classes } = useStyles()
  return (
    <Card
      withBorder
      radius="md"
      className={classes.comment}
      // style={{ maxWidth: 470 }}
      style={{ marginRight: 50, marginLeft: 50 }}
      m="md"
      p="sm"
    >
      <Group>
        <Avatar src={author.image} alt={author.name} radius="xl" />
        <div>
          <Text fz="sm">{author.username} :</Text>
        </div>
        <div>
          <b>
            <Text fz="sm">{author.name}</Text>
          </b>
        </div>
      </Group>
      <TypographyStylesProvider className={classes.body}>
        <div
          className={classes.content}
          dangerouslySetInnerHTML={{ __html: body }}
        />
      </TypographyStylesProvider>
    </Card>
  )
}
