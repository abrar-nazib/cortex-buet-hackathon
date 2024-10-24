from django.db import models
import uuid


# Create your models here.
class Train(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    num_coaches = models.IntegerField(default=5)
    num_seat_per_coach = models.IntegerField(default=55)


class Route(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    source = models.CharField(max_length=100)
    destination = models.CharField(max_length=100)
    train = models.ForeignKey(Train, on_delete=models.CASCADE)


class Schedule(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    route = models.ForeignKey(Route, on_delete=models.CASCADE)
    fare = models.FloatField()
    date = models.DateField()


class Seat(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    schedule = models.ForeignKey(Schedule, on_delete=models.CASCADE)
    seat_number = models.IntegerField()
    coach_number = models.IntegerField()
    is_booked = models.BooleanField(default=False)
