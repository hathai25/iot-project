import { Button, Stack } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export const ShellFooter = (): JSX.Element => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      // await auth.signOut();
    } catch (error) {
      console.error(error);
    } finally {
      localStorage.removeItem("token");
      navigate("/sign-in");
    }
  };

  return (
    <Stack>
      <Button leftIcon={<IconLogout size={16} />} onClick={logout}>
        Sign out
      </Button>
    </Stack>
  );
};
