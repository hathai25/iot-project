import { FormValues, VehicleForm } from "./form";
import { Button, Group, Stack } from "@mantine/core";
import { useGetVehicle, useUpdateVehicle } from "./server.ts";
import { Loader } from "@/components/loader";

export const VehicleUpdate = (props: {
  onSuccess: () => void;
  onCancel: () => void;
  id: string;
}) => {
  const { onSuccess, onCancel, id } = props;
  const update = useUpdateVehicle(id);
  const detail = useGetVehicle(id);
  const onSubmit = (values: FormValues) => {
    update.mutate(values, {
      onSuccess: onSuccess,
    });
  };

  return (
    <Stack>
      {detail.isError && <div>Something went wrong</div>}
      {detail.isLoading && <Loader />}
      {detail.isSuccess && (
        <VehicleForm
          onSubmit={onSubmit}
          initialValues={{
            plate: detail.data.plate,
            description: detail.data.description,
            type: detail.data.type,
            status: detail.data.status,
            userID: detail.data.userID,
          }}
        >
          {update.isError && <div>Something went wrong</div>}
          <Group position="right">
            <Button variant="gradient" type="submit" loading={update.isLoading}>
              Update
            </Button>
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </Group>
        </VehicleForm>
      )}
    </Stack>
  );
};
