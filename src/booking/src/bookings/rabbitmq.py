import pika
import json


def queue_notification(email, subject, body):
    # Set up connection parameters with host, credentials, and port
    credentials = pika.PlainCredentials("guest", "guest")
    params = pika.ConnectionParameters(
        host="rabbitmq",  # Assuming RabbitMQ is running on localhost
        port=5672,  # Default RabbitMQ port
        credentials=credentials,
    )
    message = {
        "email": email,
        "subject": subject,
        "body": body,
    }

    message = json.dumps(message)
    # Establish connection and declare a channel
    connection = pika.BlockingConnection(params)
    channel = connection.channel()
    channel.queue_declare("notifications")
    channel.basic_publish(exchange="", routing_key="notifications", body=message)

    channel.close()
