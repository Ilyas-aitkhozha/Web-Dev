from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=255)
    price = models.FloatField()
    description = models.TextField()
    count = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')

    likes = models.IntegerField(default=0)
    image = models.URLField(max_length=500, blank=True)
    images = models.JSONField(default=list)
    link = models.URLField(max_length=500, blank=True)
    is_favourite = models.BooleanField(default=False)
    rating = models.FloatField(default=0)

    def __str__(self):
        return self.name
