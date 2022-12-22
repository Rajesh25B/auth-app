from django.urls import path

from .views import RegisterUserView, RetrieveUserView

urlpatterns = [
    path('register/', RegisterUserView.as_view()),
    path('me/', RetrieveUserView.as_view()),
]