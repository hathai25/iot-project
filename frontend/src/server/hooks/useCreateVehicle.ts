import {useMutation, useQueryClient} from "@tanstack/react-query";
import {instanceCoreApi} from "@/provider/setupAxios.ts";
import {VEHICLE_API} from "@/server/apis";

export type CreateVehicleRequest = {
    userID: string;
    plate: string;
    type: "car" | "motorbike";
    status: "parking" | "away";
    description: string;
    image?: string;
}
export const useCreateVehicle = () => {
    const client = useQueryClient();
    return useMutation({
        mutationKey: ["vehicles", "create"],
        mutationFn: async (data: CreateVehicleRequest) => {
            await instanceCoreApi.post(VEHICLE_API.CREATE_VEHICLE, data);
        },
        onSuccess: async () => {
            await client.invalidateQueries(["vehicles", "list"]);
        }
    })
}