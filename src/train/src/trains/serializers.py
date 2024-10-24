# serializers.py
from rest_framework import serializers
from .models import Train, Route, Schedule, Seat


class SeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seat
        fields = ["id", "seat_number", "is_booked"]
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


class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = ["id", "fare", "date"]
        read_only_fields = ["id"]


class RouteSerializerNested(serializers.ModelSerializer):
    schedules = ScheduleSerializer(many=True, read_only=True, source="schedule_set")

    class Meta:
        model = Route
        fields = ["id", "name", "source", "destination", "schedules"]
        read_only_fields = ["id"]


class RouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Route
        fields = ["id", "name", "source", "destination"]
        read_only_fields = ["id"]


class TrainSerializerWithRoutes(serializers.ModelSerializer):
    routes = RouteSerializerNested(many=True, read_only=True, source="route_set")
    total_routes = serializers.SerializerMethodField()
    total_seats = serializers.SerializerMethodField()

    class Meta:
        model = Train
        fields = [
            "id",
            "name",
            "num_coaches",
            "num_seat_per_coach",
            "routes",
            "total_routes",
            "total_seats",
        ]
        read_only_fields = ["id"]

    def get_total_routes(self, obj):
        return obj.route_set.count()

    def get_total_seats(self, obj):
        return obj.num_coaches * obj.num_seat_per_coach


class TrainSerializer(serializers.ModelSerializer):
    total_seats = serializers.SerializerMethodField()

    class Meta:
        model = Train
        fields = [
            "id",
            "name",
            "num_coaches",
            "num_seat_per_coach",
            "total_seats",
        ]
        read_only_fields = ["id"]

    def get_total_seats(self, obj):
        return obj.num_coaches * obj.num_seat_per_coach


class SearchSeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seat
        fields = ["id", "seat_number", "is_booked"]


class SearchScheduleSerializer(serializers.ModelSerializer):
    available_seats = serializers.SerializerMethodField()
    available_seats_list = serializers.SerializerMethodField()

    class Meta:
        model = Schedule
        fields = ["id", "fare", "date", "available_seats", "available_seats_list"]

    def get_available_seats(self, obj):
        return obj.seat_set.filter(is_booked=False).count()

    def get_available_seats_list(self, obj):
        seats = obj.seat_set.filter(is_booked=False)
        return SearchSeatSerializer(seats, many=True).data


class SearchRouteSerializer(serializers.ModelSerializer):
    schedule = SearchScheduleSerializer(read_only=True)
    train_name = serializers.CharField(source="train.name")
    train_description = serializers.CharField(source="train.description")

    class Meta:
        model = Route
        fields = [
            "id",
            "train_name",
            "train_description",
            "name",
            "source",
            "destination",
            "schedule",
        ]


class SearchResultSerializer(serializers.Serializer):
    source = serializers.CharField()
    destination = serializers.CharField()
    date = serializers.DateField()
    routes = SearchRouteSerializer(many=True)
