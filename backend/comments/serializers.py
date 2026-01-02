from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Comment


class CommentAuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')


class CommentSerializer(serializers.ModelSerializer):
    author = CommentAuthorSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ('id', 'article', 'author', 'text', 'created_at')


class CommentWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('text',)
