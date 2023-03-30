import {
  createStyles,
  Text,
  Avatar,
  Group,
  TypographyStylesProvider,
  Paper,
  rem,
} from '@mantine/core'

const useStyles = createStyles((theme) => ({
  comment: {
    padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
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
    image: string
  }
}

export function Comment({ body, author }: CommentHtmlProps) {
  const { classes } = useStyles()
  return (
    <div style={{ maxWidth: 470 }}>
      <Paper withBorder radius="md" className={classes.comment}>
        <Group>
          <Avatar src={author.image} alt={author.name} radius="xl" />
          <div>
            <Text fz="sm">{author.name}</Text>
          </div>
        </Group>
        <TypographyStylesProvider className={classes.body}>
          <div
            className={classes.content}
            dangerouslySetInnerHTML={{ __html: body }}
          />
        </TypographyStylesProvider>
      </Paper>
    </div>
  )
}
