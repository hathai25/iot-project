import { instanceCoreApi } from "@/provider/setupAxios";
import { useMutation } from "@tanstack/react-query";
import { RFIDCard_API } from "../apis";

export const useGetRfidCard = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await instanceCoreApi.get(
        RFIDCard_API.GET.replace(":id", id),
      );
      return res.data;
    },
  });
};
