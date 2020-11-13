from django.db import models
from django.contrib.auth.models import User

class Producto(models.Model):
  nombre = models.CharField(max_length=120)
  precio = models.DecimalField(max_digits=7, decimal_places=2)
  cantidad = models.IntegerField()
  vendedor = models.ForeignKey(
    User,
    related_name='vendedor',
    on_delete=models.CASCADE
  )
