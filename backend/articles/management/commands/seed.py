from django.contrib.auth.models import User
from django.core.management.base import BaseCommand

from articles.models import Article
from comments.models import Comment


class Command(BaseCommand):
    help = 'Seed database with demo users, articles, and comments.'

    def handle(self, *args, **options):
        admin_user = self._get_or_create_user(
            username='admin',
            password='admin123456',
            is_staff=True,
            is_superuser=True,
        )
        normal_user = self._get_or_create_user(
            username='user',
            password='user123456',
            is_staff=False,
            is_superuser=False,
        )

        articles = self._get_or_create_articles(admin_user)
        self._get_or_create_comments(articles, normal_user)

        self.stdout.write(self.style.SUCCESS('Seed complete.'))
        self.stdout.write('Admin credentials: admin / admin123456')
        self.stdout.write('User credentials: user / user123456')

    def _get_or_create_user(self, *, username: str, password: str, is_staff: bool, is_superuser: bool) -> User:
        user, created = User.objects.get_or_create(
            username=username,
            defaults={'is_staff': is_staff, 'is_superuser': is_superuser},
        )
        changed = False
        if user.is_staff != is_staff:
            user.is_staff = is_staff
            changed = True
        if user.is_superuser != is_superuser:
            user.is_superuser = is_superuser
            changed = True

        if created:
            user.set_password(password)
            changed = True

        if changed:
            user.save()

        return user

    def _get_or_create_articles(self, admin_user: User) -> list[Article]:
        a1, _ = Article.objects.get_or_create(
            title='Welcome to Articles Portal',
            defaults={
                'content': 'This is a seeded article for local development.',
                'tags': 'welcome,intro',
                'author': admin_user,
            },
        )
        a2, _ = Article.objects.get_or_create(
            title='Django + React + MUI',
            defaults={
                'content': 'This article demonstrates a full-stack template with JWT auth.',
                'tags': 'django,react,mui,jwt',
                'author': admin_user,
            },
        )
        return [a1, a2]

    def _get_or_create_comments(self, articles: list[Article], normal_user: User) -> None:
        for article in articles:
            existing = Comment.objects.filter(article=article).count()
            if existing >= 2:
                continue

            Comment.objects.create(article=article, author=normal_user, text='Great article!')
            Comment.objects.create(article=article, author=normal_user, text='Thanks for sharing this.')
