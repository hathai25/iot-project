import { useMutation } from "@tanstack/react-query";
import { instanceCoreApi } from "@/provider/setupAxios.ts";
import { AUTH_API } from "@/server/apis";

type AdminSignInRequest = {
  email: string;
  password: string;
};
export const useAdminSignIn = () => {
  return useMutation({
    mutationFn: async (props: AdminSignInRequest) => {
      return await instanceCoreApi.post(AUTH_API.ADMIN_LOGIN, props);
    },
  });
};
