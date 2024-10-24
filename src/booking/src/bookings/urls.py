from django.urls import path
from .views import BookingCreateView, BookingConfirmView, BookingPaymentView

urlpatterns = [
    path("booking/", BookingCreateView.as_view(), name="booking-create"),
    path(
        "booking/<uuid:booking_id>/confirm/",
        BookingConfirmView.as_view(),
        name="booking-confirm",
    ),
    path(
        "booking/<uuid:booking_id>/payment/",
        BookingPaymentView.as_view(),
        name="booking-payment",
    ),
]
