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
    # path("trains/<uuid:pk>/", TrainDetailView.as_view(), name="train-detail"),
    # # Route URLs (nested under trains)
    # path(
    #     "trains/<uuid:train_pk>/routes/",
    #     RouteListCreateView.as_view(),
    #     name="route-list",
    # ),
    # path(
    #     "trains/<uuid:train_pk>/routes/<uuid:pk>/",
    #     RouteDetailView.as_view(),
    #     name="route-detail",
    # ),
    # # Schedule URLs (nested under routes)
    # path(
    #     "trains/<uuid:train_pk>/routes/<uuid:route_pk>/schedules/",
    #     ScheduleListCreateView.as_view(),
    #     name="schedule-list",
    # ),
    # path(
    #     "trains/<uuid:train_pk>/routes/<uuid:route_pk>/schedules/<uuid:pk>/",
    #     ScheduleDetailView.as_view(),
    #     name="schedule-detail",
    # ),
    # # Seat URLs (nested under schedules)
    # path(
    #     "trains/<uuid:train_pk>/routes/<uuid:route_pk>/schedules/<uuid:schedule_pk>/seats/",
    #     SeatListCreateView.as_view(),
    #     name="seat-list",
    # ),
    # path(
    #     "trains/<uuid:train_pk>/routes/<uuid:route_pk>/schedules/<uuid:schedule_pk>/seats/<uuid:pk>/",
    #     SeatDetailView.as_view(),
    #     name="seat-detail",
    # ),
]
