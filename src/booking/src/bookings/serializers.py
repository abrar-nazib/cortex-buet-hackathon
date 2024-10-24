from rest_framework import serializers
from .models import Booking
from django.utils import timezone
from datetime import timedelta, datetime
import uuid


class BookingCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ["user_id", "seat_id"]

    def get_payable_amount(self, seat_id):
        return 100.0

    def create(self, validated_data):
        validated_data["expires_at"] = timezone.now() + timedelta(minutes=1)
        validated_data["amount_payable"] = self.get_payable_amount(
            validated_data["seat_id"]
        )
        validated_data["otp"] = uuid.uuid4().int & (1 << 31) - 1
        return super().create(validated_data)


class BookingResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = [
            "id",
            "seat_id",
            "amount_payable",
            "payment_done",
            "booking_confirmed",
            "expires_at",
        ]
        read_only_fields = fields


class OTPValidationSerializer(serializers.Serializer):
    otp = serializers.IntegerField(required=True)
