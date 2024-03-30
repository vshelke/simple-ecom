from rest_framework import filters, generics

from .models import Product
from .serializer import ProductSerializer


class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["title", "description", "category__name"]
