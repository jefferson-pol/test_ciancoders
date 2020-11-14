#lib rest framework
from rest_framework import viewsets, status
from rest_framework.response import Response
#Models
from django.contrib.auth.models import User
from api.models import Perfil
#Serializer
from api.serializers import UserSerializer, UserListSerializer, UserUpdateSerializer

class UserViewSet(viewsets.ModelViewSet):
  queryset = User.objects.all()
  serializer_class = UserSerializer

  def create(self, request, *args, **kwargs):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
      data = request.data
      usuario = User.objects.create(
        username=data["username"],
        email=data.get("email",""),
        first_name=data["first_name"],
        last_name=data["last_name"],
      )
      usuario.set_password(data["password"])
      usuario.save()
      serializer = UserListSerializer(usuario)
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
      return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

  def update(self, request, *args, **kwargs):
    model = self.get_object()
    serializer = UserUpdateSerializer(model, request.data)
    if serializer.is_valid():
      data = request.data
      usuario = model
      usuario.username = data["username"]
      usuario.first_name = data["first_name"]
      usuario.last_name = data["last_name"]
      usuario.save()
      if data.get("password",False):
        usuario = User.objects.get(username=data["username"])
        usuario.set_password(data["password"])
        usuario.save()
      return Response(serializer.data, status=status.HTTP_200_OK)
    else:
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
