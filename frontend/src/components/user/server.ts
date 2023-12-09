import { UserEntity } from "@/server/modals/UserEntity";

export type User = UserEntity & {
  rfidCard: {
    id: string;
    balance: number;
  };
};

export { useListUser } from "@/server/hooks/useListUser";
export { useRegister } from "@/server/hooks/useRegister.ts";
export { useUpdateUser } from "@/server/hooks/useUpdateUser.ts";
export { useDeleteUser } from "@/server/hooks/useDeleteUser.ts";
