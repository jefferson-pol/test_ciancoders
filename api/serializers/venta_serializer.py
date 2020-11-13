from rest_framework import serializers
from api.models import Venta
from api.serializers import DetalleVentaSerializer

class VentaSerializer(serializers.ModelSerializer):
  venta_dv = DetalleVentaSerializer(many=True, read_only=True)
  class Meta:
    model = Venta
    fields = '__all__'
