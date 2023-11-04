import { VehicleEntity } from "@/server/modals/VehicleEntity.ts";
import { CreateVehicleRequest } from "@/server/hooks/useCreateVehicle.ts";

export type Vehicle = VehicleEntity;
export type CreateVehicleProps = CreateVehicleRequest;

export { useListVehicle } from "@/server/hooks/useListVehicle";
export { useCreateVehicle } from "@/server/hooks/useCreateVehicle";
export { useListUser } from "@/server/hooks/useListUser";
export { useUpdateVehicle } from "@/server/hooks/useUpdateVehicle.ts";
export { useGetVehicle } from "@/server/hooks/useGetVehicle.ts";
export { useDeleteVehicle } from "@/server/hooks/useDeleteVehicle.ts";
