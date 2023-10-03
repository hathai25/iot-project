package amqp_client

import (
	"log"
	"os"

	"github.com/joho/godotenv"
	amqp "github.com/rabbitmq/amqp091-go"
)

type AmqpClient struct{}

func (a AmqpClient) Consume() {
	//load env file
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	// Connect to RabbitMQ server
	AMQP_HOST := os.Getenv("AMQP_HOST")
	AMQP_PORT := os.Getenv("AMQP_PORT")
	AMQP_USERNAME := os.Getenv("AMQP_USERNAME")
	AMQP_PASSWORD := os.Getenv("AMQP_PASSWORD")
	connect_string := "amqp://" + AMQP_USERNAME + ":" + AMQP_PASSWORD + "@" + AMQP_HOST + ":" + AMQP_PORT + "/"
	conn, err := amqp.Dial(connect_string)
	if err != nil {
		log.Fatalf("Failed to connect to RabbitMQ: %s", err)
	}
	defer conn.Close()

	// Create a channel
	ch, err := conn.Channel()
	if err != nil {
		log.Fatalf("Failed to open a channel: %s", err)
	}
	defer ch.Close()

	// Declare a queue
	queue, err := ch.QueueDeclare(
		"my-queue", // name
		true,       // durable
		false,      // delete when unused
		false,      // exclusive
		false,      // no-wait
		nil,        // arguments
	)
	if err != nil {
		log.Fatalf("Failed to declare a queue: %s", err)
	} else {
		log.Printf("Queue %s declared", queue.Name)
	}

	// Consume messages from the queue
	msgs, err := ch.Consume(
		queue.Name, // queue
		"",         // consumer
		true,       // auto-ack
		false,      // exclusive
		false,      // no-local
		false,      // no-wait
		nil,        // arguments
	)
	if err != nil {
		log.Fatalf("Failed to consume messages from queue: %s", err)
	}

	for msg := range msgs {
		log.Printf("Received a message: %s", msg.Body)

	}

}
