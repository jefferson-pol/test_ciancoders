from rest_framework import viewsets
from api.models import Venta
from api.serializers import VentaSerializer

class VentaViewSet(viewsets.ModelViewSet):
  queryset = Venta.objects.all()
  serializer_class = VentaSerializer
