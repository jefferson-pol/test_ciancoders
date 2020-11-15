from django.db import models
from django.contrib.auth.models import User
from api.variables import TIPOS_USUARIO, VENDEDOR

class Perfil(models.Model):
  usuario = models.OneToOneField(
    User,
    on_delete = models.CASCADE,
    related_name = "Perfil"
  )
  foto = models.ImageField(upload_to='Perfil', blank=True, null=True)
  telefono = models.CharField(max_length=8, blank=True, null=True)
  direccion = models.CharField(max_length=250, blank=True, null=True)
  tipo = models.SmallIntegerField(choices=TIPOS_USUARIO,default=VENDEDOR)

  class Meta:
    ordering = ['id']
