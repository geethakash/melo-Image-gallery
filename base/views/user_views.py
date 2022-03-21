from email.mime import image
from django.contrib.auth.models import User
from django.http.response import HttpResponse
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import serializers
from rest_framework import response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from base.models import UserAvatar
from base.serializer import userAvatarSerializer
from base.serializer import UserSerializer, UserSerializerWithToken


from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status

from django.contrib.auth.hashers import make_password


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data

        for k, v in serializer.items():
            data[k] = v
        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def registerUser(request):
    data = request.data
    try:
        user = User.objects.create(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password']))

        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'User with this email already exist.'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@ api_view(['PUT'])
@ permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user

    serializer = UserSerializerWithToken(user, many=False)

    data = request.data
    user.first_name = data['name']
    user.email = data['email']
    user.username = data['email']

    if data['password'] != '':
        user.password = make_password(data['password'])

    user.save()

    return Response(serializer.data)


@ api_view(['GET'])
@ permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user

    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@ api_view(['GET'])
@ permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@ api_view(['GET'])
@ permission_classes([IsAdminUser])
def getUserById(request, pk):
    user = User.objects.get(id=pk)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@ api_view(['PUT'])
@ permission_classes([IsAuthenticated])
def updateUser(request, pk):
    user = User.objects.get(id=pk)

    data = request.data
    user.first_name = data['name']
    user.email = data['email']
    user.username = data['email']
    user.is_staff = data['isAdmin']

    user.save()
    serializer = UserSerializer(user, many=False)

    return Response(serializer.data)


@ api_view(['POST'])
@ permission_classes([IsAuthenticated])
def updateUserAvatar(request):
    i = request.FILES.get('image')
    avatar = UserAvatar.objects.create(user=request.user, avatar=i)
    serializer = userAvatarSerializer(avatar, many=False)
    return Response({'detail': "Profile picture changed successfully.", "avatar": serializer.data['avatar']})


@ api_view(['GET'])
@ permission_classes([IsAuthenticated])
def getUserAvatar(request):
    avatar = UserAvatar.objects.filter(
        user=request.user).order_by("-date_added")[0]
    serializer = userAvatarSerializer(avatar, many=False)
    return Response({'avatar': serializer.data['avatar']})


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteUser(request, pk):
    userForDeletion = User.objects.get(id=pk)
    userForDeletion.delete()
    return Response({'detail': 'User was deleted.'})
