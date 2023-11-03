export type VehicleEntity = {
  id: string;
  plate: string;
  description: string;
  status: "parking" | "away";
  type: "car" | "motorbike";
  userID: string;
};
