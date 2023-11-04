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
} from "@mantine/core";
import { useState } from "react";
import { Vehicle } from "./server.ts";
import { VehicleDetail } from "@/components/vehicles/detail.tsx";
import { IconEditCircle, IconInfoCircle, IconTrash } from "@tabler/icons-react";
import { VehicleUpdate } from "@/components/vehicles/update.tsx";
import { VehicleDelete } from "@/components/vehicles/delete.tsx";
export const VehicleParkingStatus = (props: { status: "parking" | "away" }) => {
  const { status } = props;

  switch (status) {
    case "parking":
      return <Badge color="green">Parking</Badge>;
    case "away":
      return <Badge color="yellow">Away</Badge>;
  }
};

export const VehicleTable = (props: { vehicles: Vehicle[] }) => {
  const { vehicles } = props;
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const [openViewModal, setOpenViewModal] = useState<boolean>(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

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
            <th style={{ whiteSpace: "nowrap" }}>Plate</th>
            <th style={{ whiteSpace: "nowrap" }}>Status</th>
            <th style={{ whiteSpace: "nowrap" }}>Description</th>
            <th style={{ whiteSpace: "nowrap" }}>Type</th>
            <th style={{ whiteSpace: "nowrap" }}>Action</th>
          </tr>
        </Box>
        <tbody>
          {vehicles.length === 0 && (
            <tr>
              <td colSpan={5}>
                <Text color="dimmed">Nothing here yet</Text>
              </td>
            </tr>
          )}
          {vehicles.map((vehicle) => (
            <tr key={vehicle.id}>
              <td style={{ whiteSpace: "nowrap" }}>{vehicle.plate}</td>
              <td style={{ whiteSpace: "nowrap" }}>
                <VehicleParkingStatus status={vehicle.status} />
              </td>
              <td style={{ whiteSpace: "nowrap" }}>{vehicle.description}</td>
              <td style={{ whiteSpace: "nowrap" }}>
                {vehicle.type[0].toUpperCase() + vehicle.type.slice(1)}
              </td>
              <td width={200} key="actions" style={{ whiteSpace: "nowrap" }}>
                <Group spacing="xs" noWrap>
                  <ActionIcon
                    onClick={() => {
                      setSelectedVehicle(vehicle);
                      setOpenViewModal(true);
                    }}
                  >
                    <IconInfoCircle />
                  </ActionIcon>
                  <ActionIcon
                    onClick={() => {
                      setSelectedVehicle(vehicle);
                      setOpenUpdateModal(true);
                    }}
                  >
                    <IconEditCircle color="green" />
                  </ActionIcon>
                  <ActionIcon
                    onClick={() => {
                      setSelectedVehicle(vehicle);
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
        title={<Title order={2}>Vehicle detail</Title>}
        opened={openViewModal}
        onClose={() => setOpenViewModal(false)}
      >
        {openViewModal && selectedVehicle && (
          <VehicleDetail
            onCancel={() => setOpenViewModal(false)}
            vehicle={selectedVehicle}
          />
        )}
      </Modal>
      <Modal
        title={<Title order={2}>Update vehicle</Title>}
        opened={openUpdateModal}
        onClose={() => setOpenUpdateModal(false)}
      >
        {openUpdateModal && selectedVehicle && (
          <VehicleUpdate
            onSuccess={() => {
              setOpenUpdateModal(false);
            }}
            onCancel={() => setOpenUpdateModal(false)}
            id={selectedVehicle.id}
          />
        )}
      </Modal>
      <Modal
        title={<Title order={2}>Delete vehicle</Title>}
        opened={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
      >
        {openDeleteModal && selectedVehicle && (
          <VehicleDelete
            onCancel={() => setOpenDeleteModal(false)}
            onSuccess={() => {
              setOpenDeleteModal(false);
            }}
            id={selectedVehicle.id}
          />
        )}
      </Modal>
    </Card>
  );
};
