import { instanceCoreApi } from "@/provider/setupAxios";
import { useMutation } from "@tanstack/react-query";

export const useGetVehicleByPlate = () => {
  return useMutation({
    mutationFn: async (plate: string) => {
      const response = await instanceCoreApi.get(`/vehicles/plate/${plate}`);
      return response;
    },
  });
};
