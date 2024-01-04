import { VehicleEntity } from "@/server/modals/VehicleEntity";

export { useGetVehicleByPlate } from "@/server/hooks/useGetVehicleByPlate";
export { useGetRfidCard } from "@/server/hooks/useGetRfidCard";
export { useGetLastHistoryOfVehicle } from "@/server/hooks/useGetLastHistoryOfVehicle";
export { useGetLastHistoryOfRFID } from "@/server/hooks/useGetLastHistoryRFIDCard";
export { useParkWithRfidCard } from "@/server/hooks/useParkWithRfidCard";
export { useGetPlateByImage } from "@/server/hooks/useGetPlateByImage";

export type VehicleWithUserDetail = VehicleEntity & {
  user: {
    id: string;
    name: string;
    avatar: string;
    rfidCard: {
      id: string;
      type: string;
      balance: number;
    };
  };
};
