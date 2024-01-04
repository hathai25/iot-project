import { instanceCoreApi } from "@/provider/setupAxios";
import { useMutation } from "@tanstack/react-query";
import { HISTORY_API } from "../apis";

export const useGetLastHistoryOfVehicle = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await instanceCoreApi.get(
        HISTORY_API.LAST_HISTORY.replace(":plate", id),
      );
      return res.data;
    },
  });
};
