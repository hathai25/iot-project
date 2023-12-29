import { Button, Group, Paper, Stack, Text } from "@mantine/core";
import { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { DescriptionList } from "../description-list";
import { useGetRfidCard, useGetVehicleByPlate } from "./server";
import { Loader } from "../loader";
import { formatCurrency } from "../utils";
import { VehicleParkingStatus } from "../vehicles/table";
import axios from "axios";
import mqtt from "mqtt";

export const HomeView = () => {
  const [image, setImage] = useState<string | null>(null);
  const [plate, setPlate] = useState<string | null>(null);
  const webcamRef = useRef<Webcam>(null);
  const vehicle = useGetVehicleByPlate();
  const capture = useCallback(() => {
    if (!webcamRef.current) return;

    const test = ["29D2-672.10", "29F2-672.10"];

    const imageSrc = webcamRef.current.getScreenshot();

    try {
      axios
        .post("http://localhost:5000/api/upload_image", {
          image: imageSrc,
        })
        .then((res) => {
          console.log(res);
          setPlate(res.data.plate);
        });
    } catch (error) {
      console.log(error);
    }
    vehicle.mutateAsync(test[Math.floor(Math.random() * 2)]);
  }, [webcamRef]);

  const rfidCard = useGetRfidCard();

  const handleRfidCard = (rfidID: string) => {
    if (rfidID) {
      console.log(rfidID);
      rfidCard.mutateAsync(rfidID);
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
  console.log(client);

  useEffect(() => {
    // Set up event handlers
    if (client) {
      client.on("connect", () => {
        console.log("connected");
        client.subscribe("park", (err) => {
          if (!err) {
            console.log("subscribed");
          }
        });
      });

      client.on("message", (topic, message) => {
        console.log(message.toJSON());
        // Handle the incoming message
        handleRfidCard(JSON.parse(message.toString()).msg);
      });
    }
  }, []);

  console.log({ rfidCard });
  console.log({ vehicle });
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
          {rfidCard.isIdle && <Text ml="xl">RfidCard</Text>}
          {rfidCard.isLoading && (
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
          {rfidCard.isSuccess && <Text>{JSON.stringify(rfidCard.data)}</Text>}
          <Text>{plate}</Text>
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
