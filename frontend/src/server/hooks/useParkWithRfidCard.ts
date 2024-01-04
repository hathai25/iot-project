import { instanceCoreApi } from "@/provider/setupAxios";
import { useMutation } from "@tanstack/react-query";
import { RFIDCard_API } from "../apis";

export type ParkWithRfidCardRequest = {
  id: string;
  vehicleID: string;
  image: string;
};

export const useParkWithRfidCard = () => {
  return useMutation({
    mutationFn: async (data: ParkWithRfidCardRequest) => {
      const res = await instanceCoreApi.post(RFIDCard_API.PARK, data);
      return res.data;
    },
  });
};
