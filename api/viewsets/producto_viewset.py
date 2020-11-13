from rest_framework import viewsets
from api.models import Producto
from api.serializers import ProductoSerializer

class ProductoViewSet(viewsets.ModelViewSet):
  queryset = Producto.objects.all()
  serializer_class = ProductoSerializer
