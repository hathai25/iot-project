import { useDeleteUser } from "./server.ts";
import { ReactNode } from "react";
import { Button, Group } from "@mantine/core";
import { UserDeleteForm } from "./form.tsx";

export const UserDelete = (prosp: {
  onSuccess: () => void;
  onCancel: () => void;
  id: string;
  children?: ReactNode;
}) => {
  const { onSuccess, onCancel, id } = prosp;

  const deleteUser = useDeleteUser();

  const onSubmit = () => {
    deleteUser.mutate(id, {
      onSuccess: onSuccess,
    });
  };

  return (
    <UserDeleteForm onSubmit={onSubmit}>
      <Group position="right">
        <Button
          variant="gradient"
          onClick={onSubmit}
          loading={deleteUser.isLoading}
        >
          Delete
        </Button>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </Group>
    </UserDeleteForm>
  );
};
