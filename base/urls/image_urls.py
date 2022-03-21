from django.urls import path
from base.views import image_views as views

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)

urlpatterns = [
    path('', views.getImages, name='images'),
    path('upload/', views.uploadImage, name='images'),
    path('<str:pk>/', views.getImageById, name='image'),
    path('rename/<str:pk>/', views.renameImage, name='rename-image'),
    path('delete/<str:pk>/', views.DeleteImage, name='delete-image'),
]
