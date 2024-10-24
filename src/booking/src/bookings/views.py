from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
from datetime import timedelta
from django.shortcuts import get_object_or_404
from .models import Booking
from .serializers import (
    BookingCreateSerializer,
    BookingResponseSerializer,
    OTPValidationSerializer,
)
from drf_spectacular.utils import extend_schema


class BookingCreateView(APIView):

    def mark_seat_as_booked(self, seat_id):
        print(f"Seat {seat_id} is marked as booked.")

    @extend_schema(request=BookingCreateSerializer, responses=BookingResponseSerializer)
    def post(self, request):
        serializer = BookingCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Check whether the validated_data["seat_id"] is already booked
        if Booking.objects.filter(
            seat_id=serializer.validated_data["seat_id"],
            # expires_at__gt=timezone.now(),
        ).exists():
            return Response(
                {"error": "Seat is already booked. Please try another seat."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        booking = serializer.save()
        print(booking.otp)
        # Mark the seat as booked: This is a dummy function
        self.mark_seat_as_booked(booking.seat_id)

        return Response(BookingResponseSerializer(booking).data)


class BookingConfirmView(APIView):
    @extend_schema(request=OTPValidationSerializer, responses=BookingResponseSerializer)
    def post(self, request, booking_id):
        booking = get_object_or_404(Booking, id=booking_id)
        serializer = OTPValidationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Check whether expires_at is already passed
        if booking.expires_at < timezone.now():
            return Response(
                {"error": "Booking time expired. Please try again."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if booking.otp != serializer.validated_data["otp"]:
            return Response(
                {"error": "Invalid OTP. Please try again."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Increase the expiry time by 5 minutes
        booking.expires_at += timedelta(minutes=5)
        booking.booking_confirmed = True
        booking.save()
        return Response(BookingResponseSerializer(booking).data)


class BookingPaymentView(APIView):
    @extend_schema(responses=BookingResponseSerializer)
    def post(self, request, booking_id):
        booking = get_object_or_404(Booking, id=booking_id)
        # If booking is not confirmed, return error
        if not booking.booking_confirmed:
            return Response(
                {"error": "Booking is not confirmed yet."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # If expired, return error
        if booking.expires_at < timezone.now():
            return Response(
                {"error": "Booking time expired. Please try again."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        booking.payment_done = True
        booking.save()
        return Response(BookingResponseSerializer(booking).data)


class BookingDeleteAllExpiredUnconfirmed(APIView):
    def remove_booking(self, seat_id):
        print(f"Booking for seat {seat_id} is queued removed.")

    def delete(self, request):
        unconfirmed_bookings = Booking.objects.filter(
            expires_at__lt=timezone.now(), payment_done=False
        )

        for booking in unconfirmed_bookings:
            self.remove_booking(booking.seat_id)
            booking.delete()

        return Response({"message": "Expired unconfirmed bookings deleted."})
