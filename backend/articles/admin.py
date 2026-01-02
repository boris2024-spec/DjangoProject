from django.contrib import admin

from .models import Article


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'author', 'created_at')
    search_fields = ('title', 'content', 'tags', 'author__username')
    list_filter = ('created_at',)
