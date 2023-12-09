import { FormValues, UserForm } from "./form";
import { Button, Group, Stack } from "@mantine/core";
import { useRegister } from "@/server/hooks/useRegister.ts";

export const UserCreate = (props: {
  onSuccess: () => void;
  onCancel: () => void;
}) => {
  const { onSuccess, onCancel } = props;
  const create = useRegister();

  const onSubmit = (values: FormValues) => {
    create.mutate(
      {
        email: values.email,
        password: values.password,
        name: values.name,
        avatar: values.avatar,
        balance: values.balance,
      },
      {
        onSuccess: onSuccess,
      },
    );
  };

  return (
    <Stack>
      <UserForm
        onSubmit={onSubmit}
        initialValues={{
          email: "",
          password: "",
          confirmPassword: "",
          name: "",
          balance: 0,
          avatar: undefined,
        }}
      >
        {create.isError && <div>Something went wrong</div>}
        <Group position="right">
          <Button variant="gradient" type="submit" loading={create.isLoading}>
            Create
          </Button>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </Group>
      </UserForm>
    </Stack>
  );
};
