from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from trains.models import Train, Route, Schedule, Seat
from django.utils import timezone
import uuid

class TrainSearchTests(APITestCase):
    
    def setUp(self):
        """Create test data for train, route, schedule, and seats"""
        # Create a train
        self.train = Train.objects.create(name="Express Train")
        
        # Create a route
        self.route = Route.objects.create(
            source="City A",
            destination="City B",
            train=self.train
        )
        
        # Create a schedule
        self.schedule = Schedule.objects.create(
            id=uuid.uuid4(),
            route=self.route,
            fare=100.0,
            date=timezone.now()
        )
        
        # Create some seats
        self.seat1 = Seat.objects.create(
            id=uuid.uuid4(),
            schedule=self.schedule,
            seat_number=1,
            is_booked=False,
            coach_number=1
        )
        
        self.seat2 = Seat.objects.create(
            id=uuid.uuid4(),
            schedule=self.schedule,
            seat_number=2,
            is_booked=False,
            coach_number=1
        )

    def test_train_search(self):
        """Test the train search endpoint with required query parameters"""
        url = reverse("train-search")
        
        # Include required query parameters (source, destination, and date)
        query_params = {
            "source": "City A",
            "destination": "City B",
            "date": self.schedule.date.strftime("%Y-%m-%d")  # Use the date from the created schedule
        }
        
        # Send the GET request with query parameters
        response = self.client.get(url, query_params)
        print(response.content)  # To see the response if there's an issue
        
        # Check that the response is successful
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_schedule_retrieve(self):
        """Test retrieving a specific schedule by UUID"""
        url = reverse("schedule-retrieve", kwargs={"pk": str(self.schedule.id)})
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["id"], str(self.schedule.id))
        self.assertEqual(response.data["fare"], 100.0)
        self.assertEqual(response.data["date"], self.schedule.date.strftime("%Y-%m-%d"))
        self.assertEqual(len(response.data["seats"]), 2)
        
        # Check the seat details
        self.assertEqual(response.data["seats"][0]["seat_number"], 1)
        self.assertFalse(response.data["seats"][0]["is_booked"])
        self.assertEqual(response.data["seats"][0]["coach_number"], 1)

