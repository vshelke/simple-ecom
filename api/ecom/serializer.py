from django.db.models import Avg, Count
from rest_framework import serializers

from .models import Product, ProductCategory


class RatingAggregateSerializer(serializers.Serializer):
    rate = serializers.FloatField()
    count = serializers.IntegerField()


class ProductSerializer(serializers.ModelSerializer):
    price = serializers.FloatField()
    category = serializers.StringRelatedField(source="category.name")
    rating = serializers.SerializerMethodField()
    stock = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ["id", "title", "price", "description", "category", "image", "rating", "stock"]

    def get_rating(self, instance):
        rating = instance.ratings.aggregate(rate=Avg("rating", default=0), count=Count("id"))
        return RatingAggregateSerializer(rating).data

    def get_stock(self, instance):
        return instance.stock


class ProductCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = ["id", "name"]
