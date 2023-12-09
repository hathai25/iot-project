import {
  Box,
  Card,
  Table,
  Text,
  Modal,
  Title,
  Group,
  ActionIcon,
  Avatar,
} from "@mantine/core";
import { useState } from "react";
import { User } from "./server.ts";
import { IconEditCircle, IconInfoCircle, IconTrash } from "@tabler/icons-react";
import { formatCurrency } from "@/components/utils";
import { UserDetail } from "./detail.tsx";
import { UserUpdate } from "./update.tsx";
import { UserDelete } from "./delete.tsx";

export const UserTable = (props: { users: User[] }) => {
  const { users } = props;
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const [openViewModal, setOpenViewModal] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <Card p={0} withBorder sx={{ overflow: "auto" }}>
      <Table withColumnBorders>
        <Box
          component="thead"
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[5]
                : theme.colors.gray[1],
          })}
        >
          <tr>
            <th style={{ whiteSpace: "nowrap" }}>Username</th>
            <th style={{ whiteSpace: "nowrap" }}>Email</th>
            <th style={{ whiteSpace: "nowrap" }}>Balance</th>
            <th style={{ whiteSpace: "nowrap" }}>Action</th>
          </tr>
        </Box>
        <tbody>
          {users.length === 0 && (
            <tr>
              <td colSpan={5}>
                <Text color="dimmed">Nothing here yet</Text>
              </td>
            </tr>
          )}
          {users.map((user) => (
            <tr key={user.id}>
              <td style={{ whiteSpace: "nowrap" }}>
                <Group>
                  <Avatar size="xs" src={user.avatar} radius="xl" />
                  <Text>{user.name}</Text>
                </Group>
              </td>
              <td style={{ whiteSpace: "nowrap" }}>{user.email}</td>
              <td style={{ whiteSpace: "nowrap" }}>
                {formatCurrency(user.rfidCard.balance)}
              </td>
              <td width={200} key="actions" style={{ whiteSpace: "nowrap" }}>
                <Group spacing="xs" noWrap>
                  <ActionIcon
                    onClick={() => {
                      setSelectedUser(user);
                      setOpenViewModal(true);
                    }}
                  >
                    <IconInfoCircle />
                  </ActionIcon>
                  <ActionIcon
                    onClick={() => {
                      setSelectedUser(user);
                      setOpenUpdateModal(true);
                    }}
                  >
                    <IconEditCircle color="green" />
                  </ActionIcon>
                  <ActionIcon
                    onClick={() => {
                      setSelectedUser(user);
                      setOpenDeleteModal(true);
                    }}
                  >
                    <IconTrash color="red" />
                  </ActionIcon>
                </Group>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal
        title={<Title order={2}>User detail</Title>}
        opened={openViewModal}
        onClose={() => setOpenViewModal(false)}
      >
        {openViewModal && selectedUser && (
          <UserDetail
            onCancel={() => setOpenViewModal(false)}
            user={selectedUser}
          />
        )}
      </Modal>
      <Modal
        title={<Title order={2}>Update user</Title>}
        opened={openUpdateModal}
        onClose={() => setOpenUpdateModal(false)}
      >
        {openUpdateModal && selectedUser && (
          <UserUpdate
            onSuccess={() => {
              setOpenUpdateModal(false);
            }}
            onCancel={() => setOpenUpdateModal(false)}
            user={selectedUser}
          />
        )}
      </Modal>
      <Modal
        title={<Title order={2}>Delete user</Title>}
        opened={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
      >
        {openDeleteModal && selectedUser && (
          <UserDelete
            onCancel={() => setOpenDeleteModal(false)}
            onSuccess={() => {
              setOpenDeleteModal(false);
            }}
            id={selectedUser.id}
          />
        )}
      </Modal>
    </Card>
  );
};
