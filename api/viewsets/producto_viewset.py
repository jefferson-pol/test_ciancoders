from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.decorators import action
from api.models import Producto
from api.serializers import ProductoSerializer

class ProductoViewSet(viewsets.ModelViewSet):
  queryset = Producto.objects.all()
  serializer_class = ProductoSerializer
  permission_classes=[IsAuthenticatedOrReadOnly]

  def create(self, request, *args, **kwargs):
    serializer = ProductoSerializer(data=request.data)
    if serializer.is_valid():
      data = request.data
      usuario = self.request.user
      producto = Producto.objects.create(
        nombre=data["nombre"],
        precio=data["precio"],
        cantidad=data["cantidad"],
        vendedor=usuario
      )
      serializer = ProductoSerializer(producto)
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

  def update(self, request, *args, **kwargs):
    model = self.get_object()
    serializer = ProductoSerializer(model, request.data)
    if serializer.is_valid():
      data = request.data
      producto = model
      usuario = self.request.user
      if usuario != producto.vendedor:
        return Response({'error':'No tiene permisos para actulizar este producto'},status=status.HTTP_401_UNAUTHORIZED)
      producto.nombre = data["nombre"]
      producto.precio = data["precio"]
      producto.cantidad = data["cantidad"]
      producto.save()
      return Response(serializer.data,status=status.HTTP_200_OK)
    else:
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

  def destroy(self, request, *args, **kwargs):
    model = self.get_object()
    try:
      usuario = self.request.user
      producto = model
      if usuario != producto.vendedor:
        return Response({'error':'No tiene permisos para Eliminar este producto'},status=status.HTTP_401_UNAUTHORIZED)
      producto.delete()
      return Response(status=status.HTTP_204_NO_CONTENT)
    except:
      return Response(status=status.HTTP_400_BAD_REQUEST)

  @action(detail=False, methods=["get"])
  def get_productos(self, request, *args, **kwargs):
    """Metodo que obtine los productos que se puede comprar"""
    try:
      productos = Producto.objects.all()
      if self.request.user.is_authenticated:
        usuario = self.request.user
        productos = Producto.objects.exclude(vendedor=usuario)
      serializer = ProductoSerializer(productos,many=True)
      return Response(serializer.data, status=status.HTTP_200_OK)
    except:
      return Response(status=status.HTTP_400_BAD_REQUEST)

  @action(detail=False, methods=["get"])
  def catalogo_productos(self, request, *args, **kwargs):
    """Metodo que obtine los productos del catalogo del vendedor"""
    try:
      if self.request.user.is_authenticated:
        usuario = self.request.user
        productos = Producto.objects.filter(vendedor=usuario)
      else:
        return Response({'error':'Inicie sesion para ver catalogo'},status=status.HTTP_400_BAD_REQUEST)
      serializer = ProductoSerializer(productos,many=True)
      return Response(serializer.data, status=status.HTTP_200_OK)
    except:
      return Response(status=status.HTTP_400_BAD_REQUEST)

