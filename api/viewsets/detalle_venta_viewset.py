from rest_framework import viewsets
from api.models import DetalleVenta
from api.serializers import DetalleVentaSerializer

class DetalleVentaViewSet(viewsets.ModelViewSet):
  queryset = DetalleVenta.objects.all()
  serializer_class = DetalleVentaSerializer
