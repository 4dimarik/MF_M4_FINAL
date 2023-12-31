import {
  createStyles,
  Container,
  Title,
  Text,
  Group,
  rem,
  Button,
} from '@mantine/core';
import { Illustration } from '../components/Illustration';
import { BackBtn } from '../components/BackBtn';

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: rem(80),
    paddingBottom: rem(80),
  },

  inner: {
    position: 'relative',
  },

  image: {
    ...theme.fn.cover(),
    opacity: 0.75,
  },

  content: {
    paddingTop: rem(220),
    position: 'relative',
    zIndex: 1,

    [theme.fn.smallerThan('sm')]: {
      paddingTop: rem(120),
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: 'center',
    fontWeight: 900,
    fontSize: rem(38),

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(32),
    },
  },

  description: {
    maxWidth: rem(540),
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
  },
}));

export default function NotFoundPage() {
  const { classes } = useStyles();

  return (
    <Container className={classes.root}>
      <div className={classes.inner}>
        <Illustration className={classes.image} />
        <div className={classes.content}>
          <Title className={classes.title}>Здесь не на что смотреть</Title>
          <Text
            color="dimmed"
            size="lg"
            align="center"
            className={classes.description}
          >
            Страница, которую вы пытаетесь открыть, не существует. Возможно, вы
            ошиблись в вводе адрес или страница была перемещена на другой
            URL-адрес. Если вы считаете , что это ошибка, обратитесь в службу
            поддержки.
          </Text>
          <Group position="center">
            <BackBtn>
              <Button variant="subtle" size="md">
                Назад
              </Button>
            </BackBtn>
          </Group>
        </div>
      </div>
    </Container>
  );
}
