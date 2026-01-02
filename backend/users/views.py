from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import MyTokenObtainPairSerializer, RegisterSerializer, UserSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        token_serializer = MyTokenObtainPairSerializer(data={
            'username': user.username,
            'password': request.data.get('password', ''),
        })
        token_serializer.is_valid(raise_exception=True)

        return Response({
            'user': UserSerializer(user).data,
            'access': token_serializer.validated_data['access'],
            'refresh': token_serializer.validated_data['refresh'],
        })


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
