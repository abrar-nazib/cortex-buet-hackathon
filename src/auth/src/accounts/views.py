from rest_framework.views import APIView
from .serializers import CustomUserSerializer
from django.contrib.auth import get_user_model
from rest_framework.response import Response


# Create your views here.
class UserRetrieveView(APIView):
    def get(self, request, id):
        user = get_user_model().objects.get(id=id)
        serializer = CustomUserSerializer(user)
        return Response(serializer.data)
