from django.db import models

# Create your models here.

class SensorDataset(models.Model):

    id = models.AutoField(primary_key=True)
    reading = models.FloatField()
    timestamp = models.IntegerField(blank=True, null=True)
    sensorType = models.CharField(max_length=2000, blank =True, null = True)