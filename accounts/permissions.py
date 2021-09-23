from rest_framework import permissions
from .models import Teacher


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom persmission to only allow owners of an object to edit it.
    """

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj == Teacher.objects.get(user=request.user)
