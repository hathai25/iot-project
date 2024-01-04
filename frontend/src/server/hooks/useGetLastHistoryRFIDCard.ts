import { instanceCoreApi } from "@/provider/setupAxios";
import { useMutation } from "@tanstack/react-query";
import { HISTORY_API } from "../apis";

export const useGetLastHistoryOfRFID = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await instanceCoreApi.get(
        HISTORY_API.RFID_LAST_HISTORY.replace(":rfid", id),
      );
      return res.data;
    },
  });
};
