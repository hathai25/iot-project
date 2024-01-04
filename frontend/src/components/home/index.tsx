import {
  Button,
  Group,
  Paper,
  Stack,
  Text,
  Image,
  Title,
  Card,
  Grid,
} from "@mantine/core";
import { Loader } from "../loader";
import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { DescriptionList } from "../description-list";
import { HistoryType } from "../history/table";
import {
  useGetLastHistoryOfRFID,
  useGetLastHistoryOfVehicle,
  useGetPlateByImage,
  useGetRfidCard,
  useGetVehicleByPlate,
  useParkWithRfidCard,
} from "./server";
import { formatCurrency } from "../utils";
import { VehicleParkingStatus } from "../vehicles/table";
import mqtt from "mqtt";
// import { TEST_IMAGE } from "./test";
import { notifications } from "@mantine/notifications";

export const HomeView = () => {
  const [image, setImage] = useState<string | null>(null);
  const webcamRef = useRef<Webcam>(null);
  const vehicle = useGetVehicleByPlate();
  const history = useGetLastHistoryOfVehicle();
  const rfidHistory = useGetLastHistoryOfRFID();
  const park = useParkWithRfidCard();
  const plate = useGetPlateByImage();

  const capture = (rfidID: string, type: string) => {
    if (!webcamRef.current) return;

    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    if (imageSrc) {
      plate.mutateAsync(imageSrc, {
        onSuccess: (data) => {
          if (type === "user") {
            vehicle.mutateAsync(data.plate, {
              onSuccess: (data) => {
                park.mutateAsync({
                  id: rfidID,
                  vehicleID: data.data[0].id,
                  image: imageSrc,
                });
              },
            });
            history.mutateAsync(data.plate);
          } else {
            park.mutateAsync({
              id: rfidID,
              vehicleID: data.plate,
              image: imageSrc,
            });
          }
        },
        onError: (error) => {
          console.log(error);
          notifications.show({
            title: "Error",
            message:
              "Can't recognize plate number" + type === "user"
                ? "/nPlease retry"
                : "",
            color: "red",
          });
          if (type !== "user") {
            park.mutateAsync({
              id: rfidID,
              vehicleID: rfidID,
              image: imageSrc,
            });
          }
        },
      });
    }
  };

  const rfidCard = useGetRfidCard();

  const handleRfidCard = (rfidID: string) => {
    if (rfidID) {
      rfidCard.mutateAsync(rfidID, {
        onSuccess: (data) => {
          capture(data.id, data.type);
        },
      });
      rfidHistory.mutateAsync(rfidID);
    }
  };
  const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;
  const brokerUrl = "mqtt://localhost:8000/mqtt";

  // MQTT client
  let client = mqtt.connect(brokerUrl, {
    clientId,
    clean: true,
    username: "",
    password: "",
    connectTimeout: 4000,
    reconnectPeriod: 1000,
  });

  useEffect(() => {
    // Set up event handlers
    if (client) {
      client.on("connect", () => {
        client.subscribe("rfid", () => {});
      });

      client.on("message", (topic, message) => {
        if (topic === "rfid") {
          console.log("Received message:", message.toString());
          handleRfidCard(message.toString());
        }
      });
    }
  }, []);

  const openBarrier = () => {
    if (client) client.publish("barrier", "1");
  };

  console.log("render");

  return (
    <Stack>
      <Grid>
        <Grid.Col span={4}>
          <Card>
            <Stack>
              <Title order={2}>Recent Image</Title>
              <Image mx="auto" src={image} height={480} withPlaceholder />
            </Stack>
          </Card>
        </Grid.Col>
        <Grid.Col span={4}>
          <Card>
            <Stack>
              <Title order={2}>Last vehicle check in</Title>
              <Image
                src={
                  history.isSuccess && plate.isSuccess
                    ? history.data?.image
                    : null
                }
                mx={"auto"}
                height={480}
                withPlaceholder
              />
              {(history.isIdle || plate.isError || history.isError) && (
                <Paper withBorder>
                  <DescriptionList
                    data={[
                      {
                        term: "Time",
                        details: <Text color="dimmed">No data</Text>,
                      },
                      {
                        term: "Type",
                        details: <Text color="dimmed">No data</Text>,
                      },
                    ]}
                  />
                </Paper>
              )}
              {history.isLoading && <Loader />}
              {history.isSuccess && plate.isSuccess && (
                <Paper withBorder>
                  <DescriptionList
                    data={[
                      {
                        term: "Time",
                        details: (
                          <Text color="dimmed">
                            {new Date(history.data.time).toLocaleDateString(
                              "en-US",
                              {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              },
                            )}
                          </Text>
                        ),
                      },
                      {
                        term: "Type",
                        details: <HistoryType status={history.data.type} />,
                      },
                    ]}
                  />
                </Paper>
              )}
            </Stack>
          </Card>
        </Grid.Col>
        <Grid.Col span={4}>
          <Card>
            <Stack>
              <Title order={2}>Last RFID Card check in</Title>
              <Image
                mx="auto"
                src={rfidHistory.data?.image || null}
                height={480}
                withPlaceholder
              />
              {(rfidHistory.isIdle || rfidHistory.isError) && (
                <Paper withBorder>
                  <DescriptionList
                    data={[
                      {
                        term: "Time",
                        details: <Text color="dimmed">No data</Text>,
                      },
                      {
                        term: "Type",
                        details: <Text color="dimmed">No data</Text>,
                      },
                    ]}
                  />
                </Paper>
              )}
              {rfidHistory.isLoading && <Loader />}
              {rfidHistory.isSuccess && (
                <Paper withBorder>
                  <DescriptionList
                    data={[
                      {
                        term: "Time",
                        details: (
                          <Text color="dimmed">
                            {new Date(rfidHistory.data.time).toLocaleDateString(
                              "en-US",
                              {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              },
                            )}
                          </Text>
                        ),
                      },
                      {
                        term: "Type",
                        details: <HistoryType status={rfidHistory.data.type} />,
                      },
                    ]}
                  />
                </Paper>
              )}
            </Stack>
          </Card>
        </Grid.Col>
        <Grid.Col span={4}>
          <Card>
            <Stack>
              <Title order={2}>Camera</Title>
              <Webcam
                style={{
                  borderRadius: 10,
                  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
                  margin: 0,
                  padding: 0,
                }}
                audio={false}
                height={240}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
              />
            </Stack>
          </Card>
        </Grid.Col>
        <Grid.Col span={4}>
          <Card>
            <Stack>
              <Title order={2}>Vehicle</Title>
              {(plate.isError || vehicle.isIdle || vehicle.isError) && (
                <Paper withBorder>
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
                    ]}
                  />
                </Paper>
              )}
              {vehicle.isLoading && <Loader />}
              {plate.isSuccess && vehicle.isSuccess && (
                <Paper withBorder>
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
                    ]}
                  />
                </Paper>
              )}
            </Stack>
          </Card>
        </Grid.Col>
        <Grid.Col span={4}>
          <Card>
            <Stack>
              <Title order={2}>RFID Card</Title>
              {(rfidCard.isIdle || rfidCard.isError) && (
                <Paper withBorder>
                  <DescriptionList
                    data={[
                      {
                        term: "ID",
                        details: <Text color="dimmed">No data</Text>,
                      },
                      {
                        term: "Type",
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
              {rfidCard.isLoading && <Loader />}
              {rfidCard.isSuccess && (
                <Paper withBorder>
                  <DescriptionList
                    data={[
                      {
                        term: "ID",
                        details: <Text color="red">{rfidCard.data.id}</Text>,
                      },
                      {
                        term: "Type",
                        details: <Text>{rfidCard.data.type}</Text>,
                      },
                      {
                        term: "Owner",
                        details: <Text>{rfidCard.data.user.name}</Text>,
                      },
                      {
                        term: "Balance",
                        details: (
                          <Text>{formatCurrency(rfidCard.data.balance)}</Text>
                        ),
                      },
                    ]}
                  />
                </Paper>
              )}
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
      <Group
        position="right"
        style={{
          position: "fixed",
          bottom: 0,
          right: 0,
          margin: 20,
        }}
      >
        <Button
          variant="gradient"
          onClick={openBarrier}
          loading={rfidCard.isLoading}
        >
          Open barrier
        </Button>
      </Group>
    </Stack>
  );
};
