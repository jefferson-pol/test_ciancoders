from rest_framework import permissions

class UsuarioPermission(permissions.BasePermission):
  """
  Global permission check for user logged.
  """
  message = 'El usuario no tiene los permisos adecuados.'

  def has_permission(self, request, view):
    if request.method == "POST":
      return True
    else:
      return bool(request.user and request.user.is_authenticated)
