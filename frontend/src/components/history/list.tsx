import { Group, Paper, Stack, Title } from "@mantine/core";
import { HistoryFilterProps, useListHistory } from "./server.ts";
import { Loader } from "@/components/loader";
import { useState } from "react";
import { HistoryTable } from "./table.tsx";
import { HistoryFilter } from "./filter.tsx";

export const HistoryList = () => {
  const [filter, setFilter] = useState<HistoryFilterProps>({});
  const list = useListHistory(filter);
  return (
    <Stack>
      <Group position="apart">
        <Title order={2}>History</Title>
      </Group>
      <HistoryFilter filter={filter} setFilter={setFilter} />
      <Paper pos="relative" withBorder>
        {list.isError && <div>Something went wrong</div>}
        {list.isLoading && <Loader />}
        {list.isSuccess && <HistoryTable histories={list.data.items} />}
      </Paper>
    </Stack>
  );
};
