import { Button, Group, Paper, Select } from "@mantine/core";
import { HistoryFilterProps } from "./server";
import { useForm } from "@mantine/form";
import { IconSearch } from "@tabler/icons-react";

export const HistoryFilter = (props: {
  filter: HistoryFilterProps;
  setFilter: (filter: HistoryFilterProps) => void;
}) => {
  const { filter, setFilter } = props;

  const form = useForm<HistoryFilterProps>({
    initialValues: filter,
  });

  return (
    <Paper p="xs">
      <form onSubmit={form.onSubmit((values) => setFilter(values))}>
        <Group spacing="xs" align="end">
          <Select
            label="Status"
            data={[
              { label: "In", value: "in" },
              { label: "Out", value: "out" },
            ]}
            clearable
            placeholder="Filter by status"
            {...form.getInputProps("type")}
          />
          <Button variant="gradient" type="submit" leftIcon={<IconSearch />}>
            Search
          </Button>
        </Group>
      </form>
    </Paper>
  );
};
