from django.urls import path, include
from django.conf.urls import url
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from api import viewsets

router = DefaultRouter()
router.register(r'user',viewsets.UserViewSet)
router.register(r'perfil',viewsets.PerfilViewSet)
router.register(r'producto',viewsets.ProductoViewSet)
router.register(r'venta',viewsets.VentaViewSet)
router.register(r'detalle_venta',viewsets.DetalleVentaViewSet)

urlpatterns = [
  path('api/', include(router.urls)),
  url(r"^api/token", obtain_auth_token, name="api-token"),
  path('api-auth/', include('rest_framework.urls')),
]
