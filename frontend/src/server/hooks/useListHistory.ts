import { useQuery } from "@tanstack/react-query";
import { instanceCoreApi } from "@/provider/setupAxios.ts";
import { HISTORY_API } from "../apis/history";

export type HistoryFilter = {
  vehicleID?: string;
  type?: "in" | "out";
};

export const useListHistory = (props: HistoryFilter) => {
  const { vehicleID, type } = props;
  return useQuery({
    queryKey: ["history", "list", type, vehicleID],
    queryFn: async () => {
      const res = await instanceCoreApi.get(HISTORY_API.LIST, {
        params: {
          vehicleID,
          type,
        },
      });
      return res.data.data;
    },
  });
};
