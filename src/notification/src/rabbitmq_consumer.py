import pika
import json
from send_email import send_otp_email


def callback(ch, method, properties, body):
    data = None
    try:
        data = json.loads(body)
        print(" [x] Received %r" % data)
    except json.JSONDecodeError:
        print(" [x] Received %r" % body)
        print(" [x] Error decoding JSON")
        return
    # Send email
    print(" [x] Sending email")
    send_otp_email(data["email"], data["subject"], data["body"])
    print(" [x] Email sent")


credentials = pika.PlainCredentials("guest", "guest")
params = pika.ConnectionParameters(
    host="rabbitmq",  # Assuming RabbitMQ is running on localhost
    port=5672,  # Default RabbitMQ port
    credentials=credentials,
)
connection = pika.BlockingConnection(params)
channel = connection.channel()
channel.queue_declare(queue="notifications")
channel.basic_consume(
    queue="notifications", on_message_callback=callback, auto_ack=True
)
print(" [*] Waiting for messages. To exit press CTRL+C")
channel.start_consuming()
