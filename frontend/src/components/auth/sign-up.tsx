import { AuthShell } from "@/components/shell/auth-shell.tsx";
import { useNavigate } from "react-router-dom";
import { isEmail, isNotEmpty, useForm } from "@mantine/form";
import {
  Anchor,
  Button,
  Card,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { CardStyles } from "@/components/auth/styles.tsx";
import { RegisterRequest, useRegister } from "@/server/hooks/useRegister.ts";
import { notifications } from "@mantine/notifications";

type FormValues = RegisterRequest & {
  confirmPassword: string;
};

export const SignUp = (): JSX.Element => {
  const signUp = useRegister();
  const navigate = useNavigate();
  const form = useForm<FormValues>({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
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

  const submit = async (values: FormValues) => {
    signUp.mutate(
      {
        email: values.email,
        password: values.password,
        name: values.name,
        avatar: values.avatar,
      },
      {
        onSuccess: () => {
          notifications.show({
            title: "Account created",
            message: "You can now sign in",
          });
          setTimeout(() => {
            navigate("/sign-in");
          }, 3000);
        },
      },
    );
  };

  return (
    <Card radius="xl" withBorder padding="lg" shadow="lg" sx={CardStyles}>
      <form onSubmit={form.onSubmit(submit)}>
        <Stack>
          <Title>Sign up with us!</Title>
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
          <TextInput label="Name" required {...form.getInputProps("name")} />
          <Text color="dimmed">
            By signing up, you agree to the Terms and Conditions and Privacy
            Policy.
          </Text>
          <Button
            loading={signUp.isLoading}
            radius="xl"
            type="submit"
            variant="filled"
          >
            Sign Up
          </Button>
          <Text color="dimmed">
            Already have an account?{" "}
            <Anchor
              variant="link"
              color="blue"
              onClick={() => navigate("/sign-in")}
            >
              Sign In
            </Anchor>
          </Text>
        </Stack>
      </form>
    </Card>
  );
};

SignUp.Layout = AuthShell;
