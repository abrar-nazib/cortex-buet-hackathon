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
