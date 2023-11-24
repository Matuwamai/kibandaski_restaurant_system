from django.db import models


# details
# qty
# price
# meal_url
# is_ready

class MealsAndDishes(models.Model):
    details = models.CharField(max_length=255, null=False)
    qty = models.IntegerField(default=1)
    media_url = models.CharField(
        max_length=255, default="https://thumbs2.imgbox.com/3f/24/TGdwPRoe_t.jpeg")
    price = models.IntegerField(default=0)
    is_ready = models.BooleanField(default=True, null=True)
