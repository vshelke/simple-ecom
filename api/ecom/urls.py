from django.urls import path

from .views import CartItemView, ProductCategoryListView, ProductDetailView, ProductListView

urlpatterns = [
    path("products/", ProductListView.as_view(), name="product-list"),
    path("products/<int:pk>/", ProductDetailView.as_view(), name="product-detail"),
    path("categories/", ProductCategoryListView.as_view(), name="category-list"),
    path("cart/", CartItemView.as_view(), name="cart-item"),
]
