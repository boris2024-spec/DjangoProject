from django.urls import path

from .views import CommentDeleteView

urlpatterns = [
    path('comments/<int:pk>/', CommentDeleteView.as_view(), name='comment_delete'),
]
