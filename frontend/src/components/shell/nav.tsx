import {
  Button,
  Group,
  Navbar,
  NavbarProps,
  Stack,
  Title,
} from "@mantine/core";
import { ShellFooter } from "./footer";
import {
  IconSettings,
  IconUserPlus,
} from "@tabler/icons-react";
import { useGetMe } from "@/server/hooks/useGetMe.ts";
import { Loader } from "@/components/loader";

interface Props {
  hidden: Required<NavbarProps>["hidden"];
}

export const ShellNav = (props: Props): JSX.Element => {
  const { hidden } = props;
  const self = useGetMe();

  return (
    <Navbar width={{ sm: 400 }} hidden={hidden} hiddenBreakpoint="sm" p="lg">
      <Navbar.Section>
        <Group position="apart">
          <Button
            p={0}
            styles={{
              root: {
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "transparent",
                },
              },
            }}
            variant="subtle"
          >
            <IconSettings />
          </Button>
          <Title order={3}>IOT</Title>
          <Button
            p={0}
            styles={{
              root: {
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "transparent",
                },
              },
            }}
            variant="subtle"
          >
            <IconUserPlus />
          </Button>
        </Group>
      </Navbar.Section>
      <Navbar.Section grow>
        {self.isError && <div>Error</div>}
        {self.isLoading && <Loader />}
        {self.isSuccess && (
          <Stack>
            
          </Stack>
        )}
      </Navbar.Section>
      <Navbar.Section>
        <ShellFooter />
      </Navbar.Section>
    </Navbar>
  );
};
