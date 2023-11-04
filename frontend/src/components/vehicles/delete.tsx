import { useDeleteVehicle } from "./server.ts";
import { ReactNode } from "react";
import { Button, Group } from "@mantine/core";
import { VehicleDeleteForm } from "@/components/vehicles/form.tsx";

export const VehicleDelete = (prosp: {
  onSuccess: () => void;
  onCancel: () => void;
  id: string;
  children?: ReactNode;
}) => {
  const { onSuccess, onCancel, id } = prosp;

  const deleteVehicle = useDeleteVehicle();

  const onSubmit = () => {
    deleteVehicle.mutate(id, {
      onSuccess: onSuccess,
    });
  };

  return (
    <VehicleDeleteForm onSubmit={onSubmit}>
      <Group position="right">
        <Button
          variant="gradient"
          onClick={onSubmit}
          loading={deleteVehicle.isLoading}
        >
          Delete
        </Button>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </Group>
    </VehicleDeleteForm>
  );
};
