from rest_framework import generics, viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from comments.models import Comment
from comments.serializers import CommentSerializer, CommentWriteSerializer

from .models import Article
from .permissions import IsAdminOrReadOnly
from .serializers import ArticleSerializer, ArticleWriteSerializer


class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.select_related('author').all()
    permission_classes = [IsAdminOrReadOnly]
    search_fields = ['title', 'content', 'tags', 'author__username']

    def get_serializer_class(self):
        if self.action in {'create', 'update', 'partial_update'}:
            return ArticleWriteSerializer
        return ArticleSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class ArticleCommentsView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        article_id = self.kwargs['article_id']
        return Comment.objects.select_related('author', 'article').filter(article_id=article_id)

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return CommentWriteSerializer
        return CommentSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user, article_id=self.kwargs['article_id'])
