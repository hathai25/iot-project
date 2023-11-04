import { useMutation, useQueryClient } from "@tanstack/react-query";
import { instanceCoreApi } from "@/provider/setupAxios.ts";
import { VEHICLE_API } from "@/server/apis";

export type UpdateVehicleRequest = {
  userID?: string;
  plate?: string;
  type?: "car" | "motorbike";
  status?: "parking" | "away";
  description?: string;
  image?: string;
};
export const useUpdateVehicle = (id: string) => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (data: UpdateVehicleRequest) => {
      await instanceCoreApi.put(
        VEHICLE_API.UPDATE_VEHICLE.replace(":id", id),
        data,
      );
    },
    onSuccess: async () => {
      await client.invalidateQueries(["vehicles", "list"]);
    },
  });
};
