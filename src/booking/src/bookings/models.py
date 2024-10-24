from django.db import models
import uuid
import random
from datetime import timedelta
from django.utils import timezone


class Booking(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_id = models.UUIDField()
    seat_id = models.UUIDField()
    payment_id = models.UUIDField(blank=True, null=True)
    otp = models.IntegerField(blank=True, null=True)
    amount_payable = models.FloatField()
    payment_done = models.BooleanField(default=False)
    booking_confirmed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()

    def save(self, *args, **kwargs):
        if not self.expires_at:  # Only set expires_at if it's not already set
            self.expires_at = timezone.now() + timedelta(minutes=1)
        super().save(*args, **kwargs)
