from django.db import models
from api.models import Producto, Venta

class DetalleVenta(models.Model):
  venta = models.ForeignKey(
    Venta,
    related_name='venta_dv',
    on_delete=models.CASCADE
  )
  producto = models.ForeignKey(
    Producto,
    related_name='producto_dv',
    on_delete=models.CASCADE
  )
  cantidad = models.PositiveIntegerField()
  subtotal = models.DecimalField(max_digits=8, decimal_places=2)

  class Meta:
    ordering = ['id']
