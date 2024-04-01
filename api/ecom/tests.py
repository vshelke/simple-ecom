from core.models import BaseUser
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate

from .models import Product, ProductCategory, ProductStock
from .serializer import ProductCategorySerializer, ProductSerializer
from .views import CartItemView, ProductCategoryListView, ProductDetailView, ProductListView

IMAGE_URL = "https://example.com/image.jpg"


class ProductListViewTest(TestCase):
    def setUp(self):
        BaseUser.objects.create(username="o@t.c", email="o@t.c")
        c1 = ProductCategory.objects.create(name="Category 1")
        c2 = ProductCategory.objects.create(name="Category 2")
        Product.objects.create(
            title="Product 1", description="Description 1", price=100, category=c1, image=IMAGE_URL
        )
        Product.objects.create(
            title="Product 2", description="Description 2", price=200, category=c2, image=IMAGE_URL
        )

    def test_get_all_products(self):
        products = Product.objects.all()
        user = BaseUser.objects.get(email="o@t.c")
        factory = APIRequestFactory()
        request = factory.get("/api/ecom/products/")
        serializer = ProductSerializer(products, many=True)
        view = ProductListView.as_view()
        force_authenticate(request, user=user)
        response = view(request)
        self.assertEqual(response.data["results"], serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_all_product_categories(self):
        categories = ProductCategory.objects.all()
        user = BaseUser.objects.get(email="o@t.c")
        factory = APIRequestFactory()
        request = factory.get("/api/ecom/categories/")
        serializer = ProductCategorySerializer(categories, many=True)
        view = ProductCategoryListView.as_view()
        force_authenticate(request, user=user)
        response = view(request)
        self.assertEqual(response.data["results"], serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class ProductDetailViewTest(TestCase):
    def setUp(self):
        BaseUser.objects.create(username="o@t.c", email="o@t.c")
        c1 = ProductCategory.objects.create(name="Category 1")
        Product.objects.create(
            title="Product 1", description="Description 1", price=100, category=c1, image=IMAGE_URL
        )

    def test_get_product_detail(self):
        product = Product.objects.first()
        user = BaseUser.objects.get(email="o@t.c")
        factory = APIRequestFactory()
        request = factory.get(f"/api/ecom/products/{product.id}/")
        serializer = ProductSerializer(product)
        view = ProductDetailView.as_view()
        force_authenticate(request, user=user)
        response = view(request, pk=product.id)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class CartItemViewTest(TestCase):
    def setUp(self):
        BaseUser.objects.create(username="o@t.c", email="o@t.c")
        c1 = ProductCategory.objects.create(name="Category 1")
        Product.objects.create(
            title="Product 1", description="Description 1", price=100, category=c1, image=IMAGE_URL
        )
        ProductStock.objects.create(product=Product.objects.first(), quantity=1)

    def test_create_cart_item(self):
        user = BaseUser.objects.get(email="o@t.c")
        product = Product.objects.first()
        factory = APIRequestFactory()
        request = factory.post("/api/ecom/cart/", {"product_id": product.id, "quantity": 1})
        view = CartItemView.as_view()
        force_authenticate(request, user=user)
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_cart_item_insufficient_stock(self):
        user = BaseUser.objects.get(email="o@t.c")
        product = Product.objects.first()
        factory = APIRequestFactory()
        request = factory.post("/api/ecom/cart/", {"product_id": product.id, "quantity": 2})
        view = CartItemView.as_view()
        force_authenticate(request, user=user)
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_get_cart_items(self):
        user = BaseUser.objects.get(email="o@t.c")
        factory = APIRequestFactory()
        request = factory.get("/api/ecom/cart/")
        view = CartItemView.as_view()
        force_authenticate(request, user=user)
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
