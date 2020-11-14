from rest_framework import serializers
from django.contrib.auth.models import User
from api.serializers import PerfilSerializer,PerfilUserSerializer

class UserSerializer(serializers.HyperlinkedModelSerializer):
  Perfil = PerfilUserSerializer(required=False)
  class Meta:
    model = User
    fields = (
      'id',
      'username',
      'email',
      'password',
      'first_name',
      'last_name',
      'Perfil'
    )

class UserListSerializer(serializers.HyperlinkedModelSerializer):
  Perfil = PerfilSerializer()
  class Meta:
    model = User
    fields = (
      'id',
      'username',
      'email',
      'first_name',
      'last_name',
      'Perfil'
    )

class UserUpdateSerializer(serializers.HyperlinkedModelSerializer):
  Perfil = PerfilUserSerializer(required=False)
  class Meta:
    model = User
    fields = (
      'id',
      'username',
      'first_name',
      'last_name',
      'Perfil'
    )
