from rest_framework import permissions
from rest_framework.generics import CreateAPIView

from .models import BaseUser
from .serializers import BaseUserSerializer


class CreateUserView(CreateAPIView):
    model = BaseUser
    permission_classes = [permissions.AllowAny]
    serializer_class = BaseUserSerializer
