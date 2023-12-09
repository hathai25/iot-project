import { instanceCoreApi } from "@/provider/setupAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { USER_API } from "../apis";

export const useDeleteUser = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      return instanceCoreApi.delete(USER_API.DELETE.replace(":id", id));
    },
    onSuccess: async () => {
      await client.invalidateQueries(["users", "list"]);
    },
  });
};
