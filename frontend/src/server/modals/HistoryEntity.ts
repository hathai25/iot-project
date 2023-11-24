export type HistoryEntity = {
  id: string;
  vehicleID: string;
  type: "in" | "out";
  time: string;
  image: string;
  plate: string;
};
