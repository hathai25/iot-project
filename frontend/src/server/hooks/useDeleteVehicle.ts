import { useMutation, useQueryClient } from "@tanstack/react-query";
import { instanceCoreApi } from "@/provider/setupAxios.ts";
import { VEHICLE_API } from "@/server/apis";

export const useDeleteVehicle = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await instanceCoreApi.delete(
        VEHICLE_API.DELETE_VEHICLE.replace(":id", id),
      );
    },
    onSuccess: async () => {
      await client.invalidateQueries(["vehicles", "list"]);
    },
  });
};
