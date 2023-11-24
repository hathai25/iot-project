import { useDeleteHistory } from "./server.ts";
import { ReactNode } from "react";
import { Button, Group } from "@mantine/core";
import { HistoryDeleteForm } from "./form.tsx";

export const HistoryDelete = (prosp: {
  onSuccess: () => void;
  onCancel: () => void;
  id: string;
  children?: ReactNode;
}) => {
  const { onSuccess, onCancel, id } = prosp;

  const deleteHistory = useDeleteHistory();

  const onSubmit = () => {
    deleteHistory.mutate(id, {
      onSuccess: onSuccess,
    });
  };

  return (
    <HistoryDeleteForm onSubmit={onSubmit}>
      <Group position="right">
        <Button
          variant="filled"
          color="red"
          onClick={onSubmit}
          loading={deleteHistory.isLoading}
        >
          Delete
        </Button>
        <Button variant="outline" color="red" onClick={onCancel}>
          Cancel
        </Button>
      </Group>
    </HistoryDeleteForm>
  );
};
