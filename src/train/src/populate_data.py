# populate_train_data.py
import os
import django
import random
from datetime import datetime, timedelta
import uuid

# Set up Django environment
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")
django.setup()

from trains.models import Train, Route, Schedule, Seat


def create_seats(schedule, num_seats):
    """Create seats for a given schedule"""
    seats = []
    for seat_number in range(1, num_seats + 1):
        seat = Seat(
            schedule=schedule,
            seat_number=seat_number,
            is_booked=random.choice(
                [True, False] + [False] * 8
            ),  # 20% chance of being booked
        )
        seats.append(seat)
    Seat.objects.bulk_create(seats)


def populate_data():
    # Delete existing data
    print("Clearing existing data...")
    Seat.objects.all().delete()
    Schedule.objects.all().delete()
    Route.objects.all().delete()
    Train.objects.all().delete()

    # Cities for routes
    cities = [
        "Dhaka",
        "Chittagong",
        "Khulna",
        "Rajshahi",
        "Sylhet",
        "Barisal",
        "Rangpur",
        "Comilla",
        "Narayanganj",
        "Gazipur",
    ]

    # Train names and types for variety
    train_types = ["Express", "InterCity", "Regional", "Fast", "Direct"]

    print("Creating trains and related data...")

    # Create 5 trains
    for i in range(5):
        # Create train
        train_name = f"{random.choice(train_types)} {i+1}"
        train = Train.objects.create(
            name=train_name,
            num_coaches=2,  # Small number for demo purposes
            num_seat_per_coach=5,  # 5 seats per coach, so 10 total
        )
        print(f"\nCreated train: {train.name}")

        # Create 2 routes for each train
        for j in range(2):
            # Select random source and destination
            source, destination = random.sample(cities, 2)

            route = Route.objects.create(
                train=train,
                name=f"{source} to {destination} Route",
                source=source,
                destination=destination,
            )
            print(f"Created route: {route.name}")

            # Create 2 schedules for each route
            base_date = datetime.now().date()
            for k in range(2):
                schedule_date = base_date + timedelta(days=k + 1)
                fare = random.uniform(50.0, 150.0)

                schedule = Schedule.objects.create(
                    route=route, date=schedule_date, fare=round(fare, 2)
                )
                print(f"Created schedule for date: {schedule_date}")

                # Create seats for this schedule
                total_seats = train.num_coaches * train.num_seat_per_coach
                create_seats(schedule, total_seats)
                print(f"Created {total_seats} seats for this schedule")


if __name__ == "__main__":
    print("Starting data population script...")
    populate_data()
    print("\nData population completed!")

    # Print summary
    print("\nSummary of created data:")
    print(f"Trains: {Train.objects.count()}")
    print(f"Routes: {Route.objects.count()}")
    print(f"Schedules: {Schedule.objects.count()}")
    print(f"Seats: {Seat.objects.count()}")

    # Print detailed example
    sample_train = Train.objects.first()
    print(f"\nDetailed example for train '{sample_train.name}':")
    for route in sample_train.route_set.all():
        print(f"\nRoute: {route.name}")
        for schedule in route.schedule_set.all():
            available_seats = schedule.seat_set.filter(is_booked=False).count()
            print(f"  Schedule Date: {schedule.date}")
            print(f"  Fare: £{schedule.fare}")
            print(f"  Available Seats: {available_seats}/{schedule.seat_set.count()}")
