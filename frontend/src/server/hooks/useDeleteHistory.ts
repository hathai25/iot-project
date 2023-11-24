import { useMutation, useQueryClient } from "@tanstack/react-query";
import { instanceCoreApi } from "@/provider/setupAxios.ts";
import { HISTORY_API } from "../apis";
import { notifications } from "@mantine/notifications";

export const useDeleteHistory = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await instanceCoreApi.delete(
        HISTORY_API.DELETE.replace(":id", id),
      );
      return res.data.data;
    },
    onSuccess: async () => {
      await client.invalidateQueries(["history", "list"]);
      notifications.show({
        title: "Delete history success!",
        message: "Delete history success!",
        color: "green",
      });
    },
  });
};
