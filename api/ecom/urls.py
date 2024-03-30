from django.urls import path

from .views import ProductCategoryListView, ProductListView

urlpatterns = [
    path("products/", ProductListView.as_view(), name="product-list"),
    path("categories/", ProductCategoryListView.as_view(), name="category-list"),
]
