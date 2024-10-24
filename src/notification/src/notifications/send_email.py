from django.core.mail import EmailMessage


def send_otp_email(subject, body, to):
    email = EmailMessage(subject, body, to=[to])
    email.send()
