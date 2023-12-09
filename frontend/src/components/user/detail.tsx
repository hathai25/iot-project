import { DescriptionList } from "@/components/description-list.tsx";
import { User } from "./server.ts";
import { Avatar, Button, Card, Group, Paper, Stack, Text } from "@mantine/core";

export const UserDetail = (props: { user: User; onCancel: () => void }) => {
  const { user, onCancel } = props;
  return (
    <Stack>
      <Card shadow="sm" padding="sm" radius="sm">
        <Stack>
          <Text>Parking Card: {user.name}</Text>
          <Text color="dimmed">{user.rfidCard.id}</Text>
        </Stack>
      </Card>
      <Paper withBorder>
        <DescriptionList
          data={[
            {
              term: "Username",
              details: (
                <Group>
                  <Avatar
                    src={user.avatar}
                    alt={user.name}
                    radius="xl"
                    size="xs"
                  />
                  <Text>{user.name}</Text>
                </Group>
              ),
            },
            {
              term: "Email",
              details: user.email,
            },
          ]}
        />
      </Paper>
      <Button variant="gradient" onClick={onCancel}>
        Ok
      </Button>
    </Stack>
  );
};
