#lib rest framework
from rest_framework import viewsets
#Models
from django.contrib.auth.models import User
from api.models import Perfil
#Serializer
from api.serializers import UserSerializer

class UserViewSet(viewsets.ModelViewSet):
  queryset = User.objects.all()
  serializer_class = UserSerializer
