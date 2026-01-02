from rest_framework import generics
from rest_framework.permissions import IsAdminUser

from .models import Comment


class CommentDeleteView(generics.DestroyAPIView):
    queryset = Comment.objects.all()
    permission_classes = [IsAdminUser]
