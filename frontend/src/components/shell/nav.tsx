import {
  Anchor,
  Avatar,
  createStyles,
  CSSObject,
  Group,
  Navbar,
  NavbarProps,
  rem,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { ShellFooter } from "./footer";
import { IconDashboard } from "@tabler/icons-react";
import { ColorSchemeSelect } from "@/provider/color-scheme/select.tsx";
import { Link, useLocation } from "react-router-dom";

const useStyles = createStyles(
  (theme): Record<"header" | "footer" | "link" | "linkActive", CSSObject> => ({
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: `calc(${theme.spacing.md} * 1.5)`,
      borderBottom: `${rem(1)} solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `${rem(1)} solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: theme.fontSizes.sm,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[1]
          : theme.colors.gray[7],
      padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
        textDecoration: "none",
      },
    },

    linkActive: {
      "&, &:hover": {
        backgroundColor:
          theme.fn.variant({
            variant: "light",
            color: theme.primaryColor,
          }).background || theme.primaryColor,
        color:
          theme.fn.variant({ variant: "light", color: theme.primaryColor })
            .color || theme.primaryColor,
      },
    },
  }),
);

interface Props {
  hidden: Required<NavbarProps>["hidden"];
}

export const ShellNav = (props: Props): JSX.Element => {
  const { hidden } = props;
  const router = useLocation();
  const { classes, cx } = useStyles();

  return (
    <Navbar
      width={{ sm: 250 }}
      hidden={hidden}
      hiddenBreakpoint="sm"
      p="lg"
      color="black"
    >
      <Navbar.Section>
        <Stack className={classes.header}>
          <Group position="apart">
            <Group>
              <Avatar radius="xl" color="blue">
                <IconDashboard />
              </Avatar>
              <Title order={3}>IOT</Title>
            </Group>
            <ColorSchemeSelect />
          </Group>
        </Stack>
      </Navbar.Section>
      <Navbar.Section grow style={{ overflow: "auto" }}>
        <Anchor
          component={Link}
          to="/vehicles/list"
          size="lg"
          className={cx(classes.link, {
            [classes.linkActive]: router.pathname.startsWith("/vehicles"),
          })}
        >
          <Text size="md">Vehicles</Text>
        </Anchor>
        <Anchor
          component={Link}
          to="/history/list"
          size="lg"
          className={cx(classes.link, {
            [classes.linkActive]: router.pathname.startsWith("/history"),
          })}
        >
          <Text size="md">History</Text>
        </Anchor>
      </Navbar.Section>
      <Navbar.Section>
        <ShellFooter />
      </Navbar.Section>
    </Navbar>
  );
};
