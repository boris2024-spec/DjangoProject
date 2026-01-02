from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import ArticleCommentsView, ArticleViewSet

router = DefaultRouter()
router.register(r'articles', ArticleViewSet, basename='articles')

urlpatterns = [
    path('', include(router.urls)),
    path('articles/<int:article_id>/comments/', ArticleCommentsView.as_view(), name='article_comments'),
]
