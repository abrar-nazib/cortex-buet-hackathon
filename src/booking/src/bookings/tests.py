from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Booking  # Import your Booking model
import uuid

class BookingTests(APITestCase):

    def setUp(self):
        # Setup any common data for your tests
        self.user_id = uuid.uuid4()
        self.seat_id = uuid.uuid4()

        # Example payload for booking
        self.booking_data = {
            "user_id": str(self.user_id),
            "seat_id": str(self.seat_id)
        }

    def test_create_booking(self):
        """Test creating a booking"""
        url = reverse('booking-create')  # Assuming the booking creation endpoint is named 'booking'
        response = self.client.post(url, self.booking_data, format='json')

        self.assertEqual(response.status_code, 200)
        self.assertIn('id', response.data)
        self.assertEqual(response.data['seat_id'], str(self.seat_id))
        self.assertFalse(response.data['booking_confirmed'])

        # Now, retrieve the OTP from the database
        booking = Booking.objects.get(id=response.data['id'])  # Get the booking instance
        self.otp = booking.otp  # Store the OTP for further tests
        print(f"OTP: {self.otp}")  # Print the OTP or use it in further tests

    def test_confirm_booking(self):
        """Test confirming a booking with OTP"""
        # First, create a booking to get the OTP
        self.test_create_booking()

        # Now confirm the booking using the OTP
        booking = Booking.objects.get(otp=self.otp)  # Fetch the booking using the OTP
        url = reverse('booking-confirm', args=[booking.id])  # Assuming the endpoint is named 'booking-confirm'
        response = self.client.post(url, {"otp": self.otp}, format='json')

        print(response.status_code, response.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data['booking_confirmed'])  # Check if the booking is confirmed

    def test_payment_for_booking(self):
        """Test making payment for a booking"""
        # First, create and confirm a booking to make a payment
        self.test_create_booking()
        booking = Booking.objects.get(otp=self.otp)  # Fetch the booking using the OTP
        url = reverse('booking-confirm', args=[booking.id])  # Confirm the booking first
        self.client.post(url, {"otp": self.otp}, format='json')  # Confirm the booking

        # Now proceed with the payment
        payment_url = reverse('booking-payment', args=[booking.id])  # Assuming the payment endpoint is named 'booking-payment'
        response = self.client.post(payment_url, {"amount": booking.amount_payable}, format='json')

        print(response.status_code, response.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data['payment_done'])  # Check if the payment is done

