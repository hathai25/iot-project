import { Button, Group, Stack, TextInput, NumberInput } from "@mantine/core";
import { User, useUpdateUser } from "./server.ts";
import { isInRange, isNotEmpty, useForm } from "@mantine/form";

type FormValues = {
  name: string;
  avatar: string | undefined;
  balance: number;
};

export const UserUpdate = (props: {
  onSuccess: () => void;
  onCancel: () => void;
  user: User;
}) => {
  const { user, onSuccess, onCancel } = props;
  const form = useForm<FormValues>({
    initialValues: {
      name: user.name,
      avatar: undefined,
      balance: user.rfidCard.balance,
    },
    validate: {
      name: isNotEmpty("Invalid name"),
      balance: isInRange({ min: user.rfidCard.balance }, "Balance too low"),
    },
  });
  const update = useUpdateUser(user.id);
  const onSubmit = (values: FormValues) => {
    update.mutate(values, {
      onSuccess: onSuccess,
    });
  };

  return (
    <Stack>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack>
          <TextInput label="Name" required {...form.getInputProps("name")} />
          <NumberInput
            label="Balance"
            required
            {...form.getInputProps("balance")}
          />
          {update.isError && <div>Something went wrong</div>}
          <Group position="right">
            <Button variant="gradient" type="submit" loading={update.isLoading}>
              Update
            </Button>
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </Group>
        </Stack>
      </form>
    </Stack>
  );
};
