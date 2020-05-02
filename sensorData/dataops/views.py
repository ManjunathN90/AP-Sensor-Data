from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
import json
import pandas as pd
from dataops.models import SensorDataset

# Create your views here.

class CreateDataAPI(APIView):
    """
    Test API

    """

    def post(self, request, *args, **kwargs):
        request_data = json.loads(request.body.decode('utf-8'))
        print(request_data)
        reading = float(request_data['reading'])
        timestamp = request_data['timeStamp']
        sensorType = request_data['sensorType']
        sensorData = SensorDataset.objects.create(reading = reading, timestamp = timestamp, sensorType = sensorType)
        sensorData.save()
        return Response({"message":"Record created successfully"}, status.HTTP_201_CREATED)

class GetResultsAPI(APIView):

    def get(self, request, *args, **kwargs):
        data = {}
        sensorDataObjs = SensorDataset.objects.all().values()
        for record in sensorDataObjs:
            record['timestamp'] = pd.to_datetime(record['timestamp'], unit = 's')+ pd.Timedelta('05:30:00')
        
        data['sensorData'] = sensorDataObjs
        data['message'] = str(len(sensorDataObjs)) + " records found"
        return Response(data, status.HTTP_200_OK)