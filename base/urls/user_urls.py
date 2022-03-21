from django.urls import path
from base.views import user_views as views

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)

urlpatterns = [
    path('', views.getUsers, name='users'),
    path('login/', views.MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('register/', views.registerUser, name='register'),
    path('<str:pk>/', views.getUserById, name='user'),
    path('profile/', views.getUserProfile, name='user-profile'),

    path('avatar', views.getUserAvatar, name='user-avatar'),
    path('avatar/upload/', views.updateUserAvatar, name='user-avatar-upload'),

    path('profile/update/', views.updateUserProfile, name='user-profile-update'),
    path('delete/<str:pk>/', views.deleteUser, name='user-delete'),
    path('update/<str:pk>/', views.updateUser, name='user-update'),

]
