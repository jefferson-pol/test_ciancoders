from rest_framework import viewsets
from api.models import Perfil
from api.serializers import PerfilSerializer

class PerfilViewSet(viewsets.ModelViewSet):
  queryset = Perfil.objects.all()
  serializer_class = PerfilSerializer
