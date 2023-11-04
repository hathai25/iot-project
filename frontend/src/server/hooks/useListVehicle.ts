import {useQuery} from "@tanstack/react-query";
import {instanceCoreApi} from "@/provider/setupAxios.ts";
import {VEHICLE_API} from "@/server/apis";

export const useListVehicle = () => {
    return useQuery({
        queryKey: ["vehicles", "list"],
        queryFn: async () => {
            const res = await instanceCoreApi.get(VEHICLE_API.GET_ALL);
            return res.data.data;
        }
    })
}