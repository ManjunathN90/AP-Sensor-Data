from django.urls import path
from . import views as views

urlpatterns = [
    path('createdata/', views.CreateDataAPI.as_view(), name = "createdata"),
    path('getresults/', views.GetResultsAPI.as_view(), name = "getresults"),
    path('fetchresults/', views.FetchResultsAPI.as_view(), name = "fetchresults"),
]