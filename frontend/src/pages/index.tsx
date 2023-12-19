import { HomeView } from "@/components/home";
import { Group, Stack, Title } from "@mantine/core";

const Index = (): JSX.Element => {
  return (
    <Stack>
      <Title>
        <Group align="center">Camera</Group>
      </Title>
      <HomeView />
    </Stack>
  );
};

export default Index;
