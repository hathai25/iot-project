import { Injectable, OnModuleInit } from "@nestjs/common";
import { MqttClient, connect } from "mqtt";

@Injectable()
export class MqttService implements OnModuleInit {
  private mqttClient: MqttClient;

  onModuleInit() {
    const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;

    const connectUrl = "mqtt://localhost:1883";
    const topic = "/nodejs/mqtt/sp";

    this.mqttClient = connect(connectUrl, {
      clientId,
      clean: true,
      username: "",
      password: "",
      connectTimeout: 4000,
      reconnectPeriod: 1000,
    });

    this.mqttClient.on("connect", function () {
      console.log("Connected to CloudMQTT");
    });

    this.mqttClient.on("error", function (error) {
      console.log("Error in connecting to CloudMQTT", error);
    });
  }

  publish(topic: string, payload: string): string {
    console.log(`Publishing to ${topic}`);
    this.mqttClient.publish(topic, payload);
    return `Publishing to ${topic}`;
  }

  subscribe(topic: string): string {
    console.log(`Subscribing to ${topic}`);
    this.mqttClient.subscribe(topic);
    return `Subscribing to ${topic}`;
  }
}
