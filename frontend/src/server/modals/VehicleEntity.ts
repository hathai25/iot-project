export type VehicleEntity = {
  id: string;
  rFIDCardId: string;
  plate: string;
  description: string;
  status: "parking" | "away";
  type: "car" | "motorbike";
  userID: string;
  image: string;
};
