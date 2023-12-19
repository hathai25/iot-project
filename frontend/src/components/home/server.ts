import { VehicleEntity } from "@/server/modals/VehicleEntity";

export { useGetVehicleByPlate } from "@/server/hooks/useGetVehicleByPlate";

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
