from rest_framework import serializers
from api.models import DetalleVenta

class DetalleVentaSerializer(serializers.ModelSerializer):
  class Meta:
    model = DetalleVenta
    fields = '__all__'
