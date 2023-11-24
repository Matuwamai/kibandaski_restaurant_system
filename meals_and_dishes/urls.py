from django.urls import path
from meals_and_dishes import views

urlpatterns = [
    path('/test', views.hello_world, name='test')
]
