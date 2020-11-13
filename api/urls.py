from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api import viewsets

router = DefaultRouter()
router.register(r'user',viewsets.UserViewSet)
router.register(r'perfil',viewsets.PerfilViewSet)
router.register(r'producto',viewsets.ProductoViewSet)
router.register(r'venta',viewsets.VentaViewSet)
router.register(r'detalle_venta',viewsets.DetalleVentaViewSet)

urlpatterns = [
  path('api/', include(router.urls))
]
