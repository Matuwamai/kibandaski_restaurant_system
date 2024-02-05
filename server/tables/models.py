from django.db import models


class RestaurantTable(models.Model):
    table_no = models.IntegerField(primary_key=True, null=False, unique=True)
    qr_code = models.TextField(null=False)
