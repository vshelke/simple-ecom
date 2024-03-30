from django.contrib import admin

from .models import CartItem, Product, ProductCategory, ProductRating, ProductStock


@admin.register(ProductCategory)
class ProductCategoryAdmin(admin.ModelAdmin):
    list_display = ("name",)
    search_fields = ("name",)


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("title", "price", "category")
    list_filter = ("category",)
    search_fields = ("title", "category__name")


@admin.register(ProductStock)
class ProductStockAdmin(admin.ModelAdmin):
    list_display = ("product", "quantity")
    list_filter = ("product__category",)
    search_fields = ("product__title", "product__category__name")


@admin.register(ProductRating)
class ProductRatingAdmin(admin.ModelAdmin):
    list_display = ("product", "user", "rating")
    list_filter = ("product__category",)
    search_fields = ("product__title", "user__username")


@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ("user", "product", "quantity", "amount")
    list_filter = ("user",)
    search_fields = ("user__username", "product__title")
