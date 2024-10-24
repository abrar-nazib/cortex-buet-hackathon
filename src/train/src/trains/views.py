# views.py
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from .models import Train, Route, Schedule, Seat
from django.db.models import Prefetch, Q
from datetime import datetime
from drf_spectacular.utils import extend_schema, OpenApiParameter

from rest_framework import serializers
from .models import Train, Route, Schedule, Seat


class SeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seat
        fields = ["id", "seat_number", "is_booked", "coach_number"]
        read_only_fields = ["id"]


# Serializer for the search result
class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = ["id", "fare", "date"]
        read_only_fields = ["id"]


class ScheduleSerializerNested(serializers.ModelSerializer):
    seats = SeatSerializer(many=True, read_only=True, source="seat_set")
    available_seats = serializers.SerializerMethodField()

    class Meta:
        model = Schedule
        fields = ["id", "fare", "date", "seats", "available_seats"]
        read_only_fields = ["id"]

    def get_available_seats(self, obj):
        return obj.seat_set.filter(is_booked=False).count()


class TrainSearchView(APIView):
    @extend_schema(
        parameters=[
            OpenApiParameter(
                name="source",
                type=str,  # Required
                description="Source city name",
            ),
            OpenApiParameter(
                name="destination",
                type=str,  # Required
                description="Destination city name",
            ),
            OpenApiParameter(
                name="date",
                type=str,  # Required
                description="Date in YYYY-MM-DD format",
            ),
        ],
    )
    def get(self, request):
        # Get and validate parameters
        source = request.query_params.get("source")
        destination = request.query_params.get("destination")
        date_str = request.query_params.get("date")

        # Validate required parameters
        if not all([source, destination, date_str]):
            return Response(
                {"error": "source, destination and date are required parameters"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Validate and parse date
        try:
            search_date = datetime.strptime(date_str, "%Y-%m-%d").date()
        except ValueError:
            return Response(
                {"error": "Invalid date format. Use YYYY-MM-DD"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Find the matching routes
        routes = Route.objects.filter(
            Q(source__iexact=source) & Q(destination__iexact=destination)
        )

        # Check whether any schedules are available for the given date on these routes
        schedules = Schedule.objects.filter(route__in=routes, date=search_date)

        results = []
        for schedule in schedules:
            schedule_id = schedule.id
            source = schedule.route.source
            destination = schedule.route.destination
            train = schedule.route.train.name
            fare = schedule.fare
            date = schedule.date
            available_seats = schedule.seat_set.filter(is_booked=False).count()
            # Put it in a dictionary
            result = {
                "id": schedule_id,
                "source": source,
                "destination": destination,
                "train": train,
                "fare": fare,
                "date": date,
                "available_seats": available_seats,
            }

            results.append(result)

        return Response(results)


class ScheduleRetrieveView(generics.RetrieveAPIView):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializerNested
