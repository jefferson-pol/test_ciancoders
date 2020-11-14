from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from api.models import Venta, DetalleVenta, Producto
from api.serializers import VentaSerializer
from decimal import Decimal

class VentaViewSet(viewsets.ModelViewSet):
  queryset = Venta.objects.all()
  serializer_class = VentaSerializer
  permission_classes = [AllowAny]

  def create(self, request, *args, **kwargs):
    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

  def update(self, request, *args, **kwargs):
    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

  def destroy(self, request, *args, **kwargs):
    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)


  @action(detail=False, methods=["post"])
  def realizar_venta(self, request, *args, **kwargs):
    """Funcion para crear la venta y sus detalles"""
    try:
      data = request.data
      total = 0
      venta = Venta()
      productos = data["productos"]
      detalles_venta = []
      for _producto in productos:
        producto = Producto.objects.get(pk=_producto["id"])
        cantidad = int(_producto["cantidad"])
        subtotal = Decimal(producto.precio*cantidad)
        detalles_venta.append(
          DetalleVenta(
            producto=producto,
            cantidad=cantidad,
            subtotal=subtotal
          )
        )
        total +=subtotal
      venta.total = total
      if data.get("user",False):
        usuario = User.objects.get(pk=data["user"])
        venta.cliente = usuario
      venta.save()
      for detalle in detalles_venta:
        detalle.venta=venta
      DetalleVenta.objects.bulk_create(detalles_venta)
      serializer = VentaSerializer(venta)
      return Response(serializer.data,status=status.HTTP_200_OK)
    except:
      return Response({'error':'Error al realizar venta'},status=status.HTTP_400_BAD_REQUEST)
