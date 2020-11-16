from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.decorators import action
from api.models import Producto, DetalleVenta
from api.serializers import ProductoSerializer
from decimal import Decimal
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

  @action(detail=False, methods=["get"],permission_classes=[IsAuthenticated])
  def catalogo_productos(self, request, *args, **kwargs):
    """Metodo que obtine los productos del catalogo del vendedor"""
    try:
      usuario = self.request.user
      productos = Producto.objects.filter(vendedor=usuario)
      serializer = ProductoSerializer(productos,many=True)
      return Response(serializer.data, status=status.HTTP_200_OK)
    except:
      return Response({'error': 'Ocurrion un error en la petición'},status=status.HTTP_400_BAD_REQUEST)

  @action(detail=False, methods=["get"],permission_classes=[IsAuthenticated])
  def ventas_globales(self, request, *args, **kwargs):
    """Metodo para reportes de ventas globales"""
    try:
      ventas = []
      total=0
      usuario = self.request.user
      productos = Producto.objects.filter(vendedor=usuario)
      for producto in productos:
        _ventas = DetalleVenta.objects.filter(producto=producto)
        cantidad = 0
        _total = 0
        for venta in _ventas:
          subtotal = Decimal(venta.subtotal)
          total += subtotal
          _total += subtotal
          cantidad += venta.cantidad
        if _total>0 and cantidad>0:
          ventas.append({
            "producto":producto.nombre,
            "cantidad":cantidad,
            "total":_total
          })
      return Response({"ventas":ventas,"total":total},status=status.HTTP_200_OK)
    except:
      return Response({'error': 'Ocurrion un error en la petición'},status=status.HTTP_400_BAD_REQUEST)

  @action(detail=False, methods=["get"],permission_classes=[IsAuthenticated])
  def ventas_producto(self, request, *args, **kwargs):
    """Metodo para reporte de ventas por producto"""
    try:
      ventas = []
      total = 0
      cantidad = 0
      data = request.query_params
      usuario = self.request.user
      producto = Producto.objects.get(pk=data["producto"],vendedor=usuario)
      nombre_producto = producto.nombre
      detalles = DetalleVenta.objects.filter(producto=producto)
      for venta in detalles:
        subtotal = Decimal(venta.subtotal)
        ventas.append({
          "fecha":venta.venta.fecha,
          "venta":venta.venta.id,
          "cantidad":venta.cantidad,
          "subtotal":subtotal
        })
        total += subtotal
        cantidad +=venta.cantidad
      respuesta ={
        "producto":nombre_producto,
        "total":total,
        "cantidad":cantidad,
        "ventas":ventas
      }
      return Response(respuesta, status=status.HTTP_200_OK)
    except:
      return Response({'error': 'Ocurrion un error en la petición'},status=status.HTTP_400_BAD_REQUEST)

  @action(detail=False, methods=["get"],permission_classes=[IsAuthenticated])
  def promedio_precios(self, request, *args, **kwargs):
    """Metodo para reportes de promedios de precios"""
    try:
      catalogo_productos = []
      total = 0
      cantidad = 0
      usuario = self.request.user
      productos = Producto.objects.filter(vendedor=usuario)
      for producto in productos:
        cantidad +=1
        precio = Decimal(producto.precio)
        catalogo_productos.append({
          "id":producto.id,
          "precio":precio,
          "nombre":producto.nombre
        })
        total += precio
      promedio = '{:.2f}'.format(float(total/cantidad))
      promedio = Decimal(promedio)
      return Response({"productos":catalogo_productos,"promedio":promedio},status=status.HTTP_200_OK)
    except:
      return Response({'error': 'Ocurrion un error en la petición'},status=status.HTTP_400_BAD_REQUEST)