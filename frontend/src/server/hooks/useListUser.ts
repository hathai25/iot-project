import {useQuery} from "@tanstack/react-query";
import {instanceCoreApi} from "@/provider/setupAxios.ts";
import {USER_API} from "@/server/apis";

export const useListUser = () => {
    return useQuery({
        queryKey: ["users", "list"],
        queryFn: async () => {
            const res = await instanceCoreApi.get(USER_API.GET_ALL);
            return res.data.data;
        }
    })
}