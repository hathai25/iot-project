import { instanceCoreApi } from "@/provider/setupAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { USER_API } from "../apis";

export const useUpdateUser = (id: string) => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async (props: {
      name: string;
      avatar: string | undefined;
      balance: number;
    }) => {
      return instanceCoreApi.put(USER_API.UPDATE.replace(":id", id), props);
    },
    onSuccess: async () => {
      await client.invalidateQueries(["users", "list"]);
    },
  });
};
