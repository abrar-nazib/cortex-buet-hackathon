import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from typing import Optional

# Email configuration
GMAIL_SMTP_SERVER = "smtp.gmail.com"
GMAIL_SMTP_PORT = 587

# You should store these securely in environment variables
GMAIL_ADDRESS = "abrarnazib@gmail.com"  # Dummy email
GMAIL_APP_PASSWORD = "upcn xfrv kjnr fawi"
# Dummy password


def send_otp_email(
    to_email: str, subject: str, body: str, from_email: Optional[str] = None
) -> bool:
    """
    Send an email using Gmail SMTP server.

    Args:
        to_email (str): Recipient email address
        subject (str): Email subject
        body (str): Email body content
        from_email (Optional[str]): Sender email address (defaults to GMAIL_ADDRESS)

    Returns:
        bool: True if email was sent successfully, False otherwise

    Raises:
        ValueError: If email credentials are not properly configured
    """
    if not GMAIL_ADDRESS or not GMAIL_APP_PASSWORD:
        raise ValueError(
            "Gmail credentials not found. Please set GMAIL_ADDRESS and GMAIL_APP_PASSWORD environment variables."
        )

    sender_email = from_email or GMAIL_ADDRESS

    try:
        # Create message
        message = MIMEMultipart()
        message["From"] = sender_email
        message["To"] = to_email
        message["Subject"] = subject

        # Add body to email
        message.attach(MIMEText(body, "plain"))

        # Create SMTP session
        with smtplib.SMTP(GMAIL_SMTP_SERVER, GMAIL_SMTP_PORT) as server:
            server.starttls()  # Enable TLS
            server.login(GMAIL_ADDRESS, GMAIL_APP_PASSWORD)

            # Send email
            server.send_message(message)

            return True

    except smtplib.SMTPAuthenticationError:
        print("Failed to authenticate with Gmail. Please check your credentials.")
        return False
    except smtplib.SMTPException as e:
        print(f"An error occurred while sending the email: {str(e)}")
        return False
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        return False
