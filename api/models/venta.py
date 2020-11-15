from django.db import models
from django.contrib.auth.models import User

class Venta(models.Model):
  fecha = models.DateField(auto_now=True, auto_now_add=False)
  total = models.DecimalField(max_digits=9, decimal_places=2)
  cliente = models.ForeignKey(
    User,
    related_name='cliente',
    on_delete=models.CASCADE,
    blank=True, null=True
  )

  class Meta:
    ordering = ['id']
