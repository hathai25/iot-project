import {
  Badge,
  Box,
  Card,
  Table,
  Text,
  Modal,
  Title,
  Group,
  ActionIcon,
  Image,
} from "@mantine/core";
import { useState } from "react";
import { History } from "./server.ts";
import { IconInfoCircle, IconTrash } from "@tabler/icons-react";
import { HistoryDelete } from "./delete.tsx";
import { HistoryDetail } from "./detail.tsx";

export const HistoryType = (props: { status: "in" | "out" }) => {
  const { status } = props;

  switch (status) {
    case "in":
      return <Badge color="green">In</Badge>;
    case "out":
      return <Badge color="yellow">Out</Badge>;
  }
};

export const HistoryTable = (props: { histories: History[] }) => {
  const { histories } = props;
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openViewModal, setOpenViewModal] = useState<boolean>(false);
  const [selectedVehicleID, setSelectedVehicleID] = useState<string | null>(
    null,
  );
  const [selectedHistoryID, setSelectedHistoryID] = useState<string | null>(
    null,
  );

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
            <th style={{ whiteSpace: "nowrap" }}>Image</th>
            <th style={{ whiteSpace: "nowrap" }}>Status</th>
            <th style={{ whiteSpace: "nowrap" }}>Time</th>
            <th style={{ whiteSpace: "nowrap" }}>Plate</th>
            <th style={{ whiteSpace: "nowrap" }}>Action</th>
          </tr>
        </Box>
        <tbody>
          {histories.length === 0 && (
            <tr>
              <td colSpan={5}>
                <Text color="dimmed">Nothing here yet</Text>
              </td>
            </tr>
          )}
          {histories.map((history) => (
            <tr key={history.id}>
              <td style={{ whiteSpace: "nowrap" }}>
                <Image
                  src={history.image}
                  alt="vehicle image"
                  width={160}
                  height={90}
                  maw={160}
                  mx="auto"
                  radius="md"
                />
              </td>
              <td style={{ whiteSpace: "nowrap" }}>
                <HistoryType status={history.type} />
              </td>
              <td style={{ whiteSpace: "nowrap" }}>
                {new Date(history.time).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </td>
              <td style={{ whiteSpace: "nowrap" }}>{history.plate}</td>
              <td width={200} key="actions" style={{ whiteSpace: "nowrap" }}>
                <Group spacing="xs" noWrap>
                  <ActionIcon
                    onClick={() => {
                      setSelectedVehicleID(history.vehicleID);
                      setOpenViewModal(true);
                    }}
                  >
                    <IconInfoCircle />
                  </ActionIcon>
                  <ActionIcon
                    onClick={() => {
                      setSelectedHistoryID(history.id);
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
        title={<Title order={2}>Vehicle history detail</Title>}
        opened={openViewModal}
        onClose={() => setOpenViewModal(false)}
        size="xl"
      >
        {openViewModal && selectedVehicleID && (
          <HistoryDetail
            onCancel={() => setOpenViewModal(false)}
            vehicleID={selectedVehicleID}
          />
        )}
      </Modal>
      <Modal
        title={<Title order={2}>Delete vehicle</Title>}
        opened={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
      >
        {openDeleteModal && selectedHistoryID && (
          <HistoryDelete
            onCancel={() => setOpenDeleteModal(false)}
            onSuccess={() => {
              setOpenDeleteModal(false);
            }}
            id={selectedHistoryID}
          />
        )}
      </Modal>
    </Card>
  );
};
