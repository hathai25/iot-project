import { HistoryFilter } from "./../../server/hooks/useListHistory";
import { HistoryEntity } from "@/server/modals/HistoryEntity";

export type History = HistoryEntity;
export type HistoryFilterProps = HistoryFilter;

export { useListHistory } from "@/server/hooks/useListHistory";
export { useDeleteHistory } from "@/server/hooks/useDeleteHistory";
