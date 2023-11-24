import { Stack, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { ReactNode } from "react";

export const HistoryDeleteForm = (props: {
  onSubmit: () => void;
  children: ReactNode;
}) => {
  const { onSubmit, children } = props;
  const form = useForm();
  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack>
        <Text>Are you sure you want to delete this history?</Text>
        {children}
      </Stack>
    </form>
  );
};
