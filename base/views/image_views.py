import imp
from urllib import response
from django.http import HttpResponse
from base.serializer import ImageSerializer
from base.models import Image
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getImages(request):
    user = request.user
    images = Image.objects.filter(user=user).order_by("-date_added")

    serializer = ImageSerializer(images, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getImageById(request, pk):
    try:
        image = Image.objects.get(id=pk)
        serializer = ImageSerializer(image, many=False)
        if image.user == request.user:
            return Response(serializer.data)

        return Response({"detail": "You don't have access to this image."}, status=status.HTTP_403_FORBIDDEN)
    except:
        return Response({"detail": "Image that you request isn't exist."}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def renameImage(request, pk):
    image = Image.objects.get(id=pk)

    if image.user == request.user:
        data = request.data
        image.caption = data['caption']
        image.save()
        serializer = ImageSerializer(image, many=False)
        return Response({"detail": "Image was renamed successfully.", "image": serializer.data})
    else:
        return Response({"detail": "You don't have access to modify this image."}, status=status.HTTP_403_FORBIDDEN)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def DeleteImage(request, pk):
    image = Image.objects.get(id=pk)

    if image.user == request.user:
        image.delete()
        return Response({'detail': "Image was deleted successfully."})
    else:
        return Response({"detail": "You don't have access to delete this image."}, status=status.HTTP_403_FORBIDDEN)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def uploadImage(request):
    data = request.data
    print(data)
    i = request.FILES.get('image')
    image = Image.objects.create(
        caption=data['caption'],
        source=i,
        user=request.user
    )
    image.save()

    return Response({'detail': "Image was added successfully."})
