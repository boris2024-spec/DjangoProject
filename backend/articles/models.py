from django.conf import settings
from django.db import models


class Article(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    tags = models.CharField(max_length=512, blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='articles',
    )

    class Meta:
        ordering = ['-created_at']

    def __str__(self) -> str:
        return self.title
