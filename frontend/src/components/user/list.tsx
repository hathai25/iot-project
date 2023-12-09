import { Button, Group, Modal, Paper, Stack, Title } from "@mantine/core";
import { useListUser } from "./server.ts";
import { Loader } from "@/components/loader";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { UserTable } from "./table.tsx";
import { UserCreate } from "./create.tsx";

export const UserList = () => {
  const list = useListUser();
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  return (
    <Stack>
      <Group position="apart">
        <Title order={2}>User</Title>
        <div>
          <Button
            onClick={() => setOpenCreateModal(true)}
            variant="gradient"
            leftIcon={<IconPlus />}
          >
            Add
          </Button>
        </div>
      </Group>
      <Paper pos="relative" withBorder>
        {list.isError && <div>Something went wrong</div>}
        {list.isLoading && <Loader />}
        {list.isSuccess && <UserTable users={list.data.items} />}
      </Paper>
      <Modal
        title={<Title order={2}>Create User</Title>}
        opened={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
      >
        {openCreateModal && (
          <UserCreate
            onCancel={() => setOpenCreateModal(false)}
            onSuccess={() => {
              setOpenCreateModal(false);
              notifications.show({
                title: "User created",
                message: "User created successfully",
              });
            }}
          />
        )}
      </Modal>
    </Stack>
  );
};
