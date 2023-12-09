import {
  Stack,
  Text,
  TextInput,
  PasswordInput,
  NumberInput,
} from "@mantine/core";
import { isNotEmpty, isEmail, useForm } from "@mantine/form";
import { ReactNode } from "react";
import { RegisterRequest } from "@/server/hooks/useRegister";

export type FormValues = RegisterRequest & {
  confirmPassword: string;
};

export const UserForm = (props: {
  initialValues: FormValues;
  onSubmit: (values: FormValues) => void;
  children?: ReactNode;
}) => {
  const { initialValues, onSubmit, children } = props;
  const form = useForm<FormValues>({
    initialValues: {
      email: initialValues.email,
      password: initialValues.password,
      confirmPassword: "",
      name: initialValues.name,
      avatar: undefined,
    },
    validate: {
      email: isEmail("Invalid email"),
      password: isNotEmpty("Invalid password"),
      confirmPassword: (confirmPassword, formValues) =>
        confirmPassword !== formValues.password ? (
          <Text color="red">Passwords do not match</Text>
        ) : null,
    },
  });

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack>
        <TextInput label="Name" required {...form.getInputProps("name")} />
        <TextInput
          label="Email"
          placeholder="test@example.com"
          required
          {...form.getInputProps("email")}
        />
        <PasswordInput
          label="Password"
          required
          {...form.getInputProps("password")}
        />
        <PasswordInput
          label="Confirm Password"
          required
          {...form.getInputProps("confirmPassword")}
        />
        <NumberInput
          label="Balance"
          required
          {...form.getInputProps("balance")}
        />
        {children}
      </Stack>
    </form>
  );
};

export const UserDeleteForm = (props: {
  onSubmit: () => void;
  children: ReactNode;
}) => {
  const { onSubmit, children } = props;
  const form = useForm();
  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack>
        <Text>Are you sure you want to delete this user?</Text>
        {children}
      </Stack>
    </form>
  );
};
