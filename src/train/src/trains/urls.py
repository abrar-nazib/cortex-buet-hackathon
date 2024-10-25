# urls.py
from django.urls import path
from .views import (
    # TrainListCreateView,
    # TrainDetailView,
    # RouteListCreateView,
    # RouteDetailView,
    # ScheduleListCreateView,
    # ScheduleDetailView,
    # SeatListCreateView,
    # SeatDetailView,
    ScheduleRetrieveView,
    TrainSearchView,
    SeatGetWithScheduleView,
    SetSeatBookedView,
    SetSeatNotBookedView,
)

urlpatterns = [
    # Train URLs
    # path("trains/", TrainListCreateView.as_view(), name="train-list"),
    path("trains/search/", TrainSearchView.as_view(), name="train-search"),
    path(
        "trains/schedules/<uuid:pk>/",
        ScheduleRetrieveView.as_view(),
        name="schedule-retrieve",
    ),
    path("trains/seats/<uuid:pk>/", SeatGetWithScheduleView.as_view(), name="seat-get"),
    path("trains/seats/<uuid:pk>/book/", SetSeatBookedView.as_view(), name="seat-book"),
    path(
        "trains/seats/<uuid:pk>/unbook/",
        SetSeatNotBookedView.as_view(),
        name="seat-unbook",
    ),
]
