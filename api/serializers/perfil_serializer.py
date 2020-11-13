from rest_framework import serializers
from api.models import Perfil

class PerfilSerializer(serializers.ModelSerializer):
  foto = serializers.ImageField(required=False)
  class Meta:
    model = Perfil
    fields = (
      'foto',
      'telefono',
      'direccion',
      'tipo',
    )
