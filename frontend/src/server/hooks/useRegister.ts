import { useMutation } from "@tanstack/react-query";
import { AUTH_API } from "@/server/apis";
import { instanceCoreApi } from "@/provider/setupAxios.ts";

export type RegisterRequest = {
  email: string;
  password: string;
  name: string;
  avatar?: string;
};

export const useRegister = () => {
  return useMutation({
    mutationFn: async (props: RegisterRequest) => {
      await instanceCoreApi.post(AUTH_API.REGISTER, props);
    },
  });
};
