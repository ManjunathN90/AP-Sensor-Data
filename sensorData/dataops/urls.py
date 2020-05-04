from django.urls import path
from . import views as views

urlpatterns = [
    path('createdata/', views.CreateDataAPI.as_view(), name = "createdata"),
    path('getinitialresults/', views.GetInitialResultsAPI.as_view(), name = "getinitialresults"),
    path('fetchresults/', views.FetchResultsAPI.as_view(), name = "fetchresults"),
]