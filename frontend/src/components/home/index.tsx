import { Button, Group, Paper, Stack, Text } from "@mantine/core";
import { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { DescriptionList } from "../description-list";
import { useGetVehicleByPlate } from "./server";
import { Loader } from "../loader";
import { formatCurrency } from "../utils";
import { VehicleParkingStatus } from "../vehicles/table";

export const HomeView = () => {
  const [image, setImage] = useState<string | null>(null);
  const webcamRef = useRef<Webcam>(null);
  const vehicle = useGetVehicleByPlate();
  const capture = useCallback(() => {
    if (!webcamRef.current) return;

    const test = ["29D2-672.10", "29F2-672.10"];

    const imageSrc = webcamRef.current.getScreenshot();

    console.log(imageSrc);
    vehicle.mutateAsync(test[Math.floor(Math.random() * 2)]);
  }, [webcamRef]);

  console.log(vehicle);

  return (
    <Stack>
      <Paper withBorder>
        <Group p="md">
          <Webcam
            style={{
              borderRadius: 10,
              boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
              margin: 0,
              padding: 0,
            }}
            audio={false}
            height={720}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
          />
          {(vehicle.isIdle || vehicle.isError) && (
            <Paper withBorder ml="xl">
              <DescriptionList
                data={[
                  {
                    term: "Description",
                    details: <Text color="dimmed">No data</Text>,
                  },
                  {
                    term: "Plate Number",
                    details: <Text color="dimmed">No data</Text>,
                  },
                  {
                    term: "Status",
                    details: <Text color="dimmed">No data</Text>,
                  },
                  {
                    term: "Owner",
                    details: <Text color="dimmed">No data</Text>,
                  },
                  {
                    term: "Balance",
                    details: <Text color="dimmed">No data</Text>,
                  },
                ]}
              />
            </Paper>
          )}
          {vehicle.isLoading && (
            <Text ml="xl">
              Please wait... <Loader />
            </Text>
          )}
          {vehicle.isSuccess && (
            <Paper withBorder ml="xl">
              <DescriptionList
                data={[
                  {
                    term: "Description",
                    details: (
                      <Text color="red">
                        {vehicle.data.data[0].description}
                      </Text>
                    ),
                  },
                  {
                    term: "Plate Number",
                    details: <Text>{vehicle.data.data[0].plate}</Text>,
                  },
                  {
                    term: "Status",
                    details: (
                      <VehicleParkingStatus
                        status={vehicle.data.data[0].status}
                      />
                    ),
                  },
                  {
                    term: "Owner",
                    details: <Text>{vehicle.data.data[0].user.name}</Text>,
                  },
                  {
                    term: "Balance",
                    details: (
                      <Text>
                        {formatCurrency(
                          vehicle.data.data[0].user.rfidCard.balance,
                        )}
                      </Text>
                    ),
                  },
                ]}
              />
            </Paper>
          )}
        </Group>
      </Paper>
      <Group>
        <Button
          variant="gradient"
          onClick={capture}
          loading={vehicle.isLoading}
        >
          Capture photo
        </Button>
      </Group>
    </Stack>
  );
};
