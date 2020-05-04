from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
import json
import pandas as pd
import sys
import math
from dataops.models import SensorDataset

# Create your views here.


# API to record incoming sensor data from the post request
class CreateDataAPI(APIView):

    def post(self, request, *args, **kwargs):
        request_data = json.loads(request.body.decode('utf-8'))
        reading = float(request_data['reading'])
        timestamp = request_data['timestamp']
        sensorType = request_data['sensorType']
        sensorData = SensorDataset.objects.create(reading = reading, timestamp = timestamp, sensorType = sensorType)
        sensorData.save()
        return Response({"message":"Record created successfully"}, status.HTTP_201_CREATED)

# API is called when the fetch result page is loaded to get sensor type values for dropdown
class GetInitialResultsAPI(APIView):

    def get(self, request, *args, **kwargs):
        data = {}
        sensorTypeList = []
        sensorTypeUniqueList = []
        sensorDataObjs = SensorDataset.objects.all().values()
        for record in sensorDataObjs:
            sensorTypeList.append(record['sensorType'])

        #Get unique sensor type values from the sensor data stored 
        for item in sensorTypeList:
            if item not in sensorTypeUniqueList:
                sensorTypeUniqueList.append(item)

        data['sensorTypeList'] = sensorTypeUniqueList
        
        return Response(data, status.HTTP_200_OK)

# Fetch Results along with filter parameters
class FetchResultsAPI(APIView):

    def get(self, request, *args, **kwargs):
        data = {}
        startDate = int(request.GET['startDate']) if(request.GET['startDate'] != "NaN") else 0
        endDate = int(request.GET['endDate']) if(request.GET['endDate'] != "NaN") else sys.maxsize
        sensorType = request.GET['sensorType']

        #If sensor type value is given. Contraint to choose sensor type is taken care at front end
        if(sensorType == "undefined" or sensorType == ""):                                              
            fetchResult = SensorDataset.objects.filter(timestamp__gte = startDate, timestamp__lte = endDate).values()
        else:
            fetchResult = SensorDataset.objects.filter(timestamp__gte = startDate, timestamp__lte = endDate).filter(sensorType = sensorType).values()

        #converting integer to datetime format to display to user
        for record in fetchResult:
            record['timestamp'] = pd.to_datetime(record['timestamp'], unit = 's')+ pd.Timedelta('05:30:00')

        #Data to be sent as response
        data['fetchResults'] = fetchResult
        data['message'] = str(len(fetchResult)) + " records found" 

        return Response(data, status.HTTP_200_OK)   
