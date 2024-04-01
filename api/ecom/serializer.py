from django.db.models import Avg, Count
from rest_framework import serializers

from .models import CartItem, Product, ProductCategory


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


class CartItemSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    price = serializers.FloatField()
    amount = serializers.FloatField()
    title = serializers.StringRelatedField(source="product.title")
    image = serializers.StringRelatedField(source="product.image")

    class Meta:
        model = CartItem
        fields = [
            "id",
            "title",
            "price",
            "image",
            "quantity",
            "amount",
        ]

    def get_id(self, instance):
        return instance.product.id
