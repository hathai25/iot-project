import { Card, Button, Table, Box, Stack, Text, Image } from "@mantine/core";
import { History, useListHistory } from "./server";
import { Loader } from "../loader";
import { HistoryType } from "./table";

export const HistoryDetail = (props: {
  vehicleID: string;
  onCancel: () => void;
}) => {
  const { vehicleID, onCancel } = props;

  const vehicleHistory = useListHistory({ vehicleID });

  return (
    <Stack>
      {vehicleHistory.isError && <div>Something went wrong</div>}
      {vehicleHistory.isLoading && <Loader />}
      {vehicleHistory.isSuccess && (
        <Card p={0} withBorder sx={{ overflow: "auto" }}>
          <Table withColumnBorders>
            <Box
              component="thead"
              sx={(theme) => ({
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[5]
                    : theme.colors.gray[1],
              })}
            >
              <tr>
                <th style={{ whiteSpace: "nowrap" }}>Image</th>
                <th style={{ whiteSpace: "nowrap" }}>Status</th>
                <th style={{ whiteSpace: "nowrap" }}>Time</th>
                <th style={{ whiteSpace: "nowrap" }}>Plate</th>
              </tr>
            </Box>
            <tbody>
              {vehicleHistory.data.items.length === 0 && (
                <tr>
                  <td colSpan={5}>
                    <Text color="dimmed">Nothing here yet</Text>
                  </td>
                </tr>
              )}
              {vehicleHistory.data.items.map((history: History) => (
                <tr key={history.id}>
                  <td style={{ whiteSpace: "nowrap" }}>
                    <Image
                      src={history.image}
                      alt="vehicle image"
                      width={160}
                      height={90}
                      maw={160}
                      mx="auto"
                      radius="md"
                    />
                  </td>
                  <td style={{ whiteSpace: "nowrap" }}>
                    <HistoryType status={history.type} />
                  </td>
                  <td style={{ whiteSpace: "nowrap" }}>
                    {new Date(history.time).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                  <td style={{ whiteSpace: "nowrap" }}>{history.plate}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      )}
      <Button variant="gradient" onClick={onCancel}>
        Ok
      </Button>
    </Stack>
  );
};
