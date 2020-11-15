#lib rest framework
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from api.permissions import UsuarioPermission
#Models
from django.contrib.auth.models import User
from api.models import Perfil
#Serializer
from api.serializers import UserSerializer, UserListSerializer, UserUpdateSerializer
from api.variables import VENDEDOR

class UserViewSet(viewsets.ModelViewSet):
  queryset = User.objects.all()
  serializer_class = UserSerializer
  permission_classes = [UsuarioPermission]

  def create(self, request, *args, **kwargs):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
      data = request.data
      usuario = User.objects.create(
        username=data["email"],
        email=data.get("email",""),
        first_name=data["first_name"],
        last_name=data["last_name"],
      )
      if data.get("Perfil",False):
        Perfil.objects.create(
          foto=data["Perfil"].get("foto",None),
          telefono=data["Perfil"]["telefono"],
          direccion=data["Perfil"]["direccion"],
          tipo=VENDEDOR,
          usuario=usuario
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
      usuario.first_name = data["first_name"]
      usuario.last_name = data["last_name"]
      usuario.save()
      if data.get("Perfil",False):
        perfil = usuario.Perfil
        perfil.telefono = data["Perfil"]["telefono"]
        perfil.direccion = data["Perfil"]["direccion"]
        perfil.tipo = usuario.Perfil.tipo
        if data["Perfil"].get("foto",False) is not False:
          perfil.foto = data["Perfil"]["foto"]
        perfil.save()
      if data.get("password",False):
        usuario = User.objects.get(username=data["username"])
        usuario.set_password(data["password"])
        usuario.save()
      return Response(serializer.data, status=status.HTTP_200_OK)
    else:
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

  @action(detail=False, methods=["post"], permission_classes=[AllowAny])
  def get_token(self, request, *args, **kwargs):
    data = request.data
    try:
      usuario = User.objects.get(email=data.get("email"))
      if usuario.check_password(data.get("password")):
        token, created = Token.objects.get_or_create(user=usuario)
        serializer = UserListSerializer(usuario)
        return Response({'token':token.key, "me":serializer.data},status=status.HTTP_200_OK)
      else:
        return Response({'error':'Email o Contraseña incorrectos'},status=status.HTTP_400_BAD_REQUEST)
    except User.DoesNotExist:
      return Response({'error':'El usuario no existe'},status=status.HTTP_400_BAD_REQUEST)
