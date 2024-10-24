from django.urls import path
from .views import UserRetrieveView

urlpatterns = [
    path("users/<uuid:id>/", UserRetrieveView.as_view(), name="user-retrieve"),
]
