from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Article


class ArticleAuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')


class ArticleSerializer(serializers.ModelSerializer):
    author = ArticleAuthorSerializer(read_only=True)

    class Meta:
        model = Article
        fields = ('id', 'title', 'content', 'tags', 'created_at', 'author')


class ArticleWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ('id', 'title', 'content', 'tags')
