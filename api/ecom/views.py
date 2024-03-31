from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, generics

from .models import Product, ProductCategory
from .serializer import ProductCategorySerializer, ProductSerializer


class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    search_fields = ["title", "description", "category__name"]
    filterset_fields = ["category_id"]


class ProductCategoryListView(generics.ListAPIView):
    queryset = ProductCategory.objects.all()
    serializer_class = ProductCategorySerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["name"]


class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
