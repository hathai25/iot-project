import { useQuery } from "@tanstack/react-query";
import { instanceCoreApi } from "@/provider/setupAxios.ts";
import { VEHICLE_API } from "@/server/apis";

export const useGetVehicle = (id: string) => {
  return useQuery({
    queryKey: ["vehicle", "get", id],
    queryFn: async () => {
      const res = await instanceCoreApi.get(
        VEHICLE_API.GET_VEHICLE.replace(":id", id),
      );
      return res.data.data;
    },
  });
};
