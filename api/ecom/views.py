from django.http import JsonResponse
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, generics, permissions, status

from .models import CartItem, Product, ProductCategory
from .serializer import CartItemSerializer, ProductCategorySerializer, ProductSerializer


class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    search_fields = ["title", "description", "category__name"]
    filterset_fields = ["category_id"]
    permission_classes = [permissions.IsAuthenticated]


class ProductCategoryListView(generics.ListAPIView):
    queryset = ProductCategory.objects.all()
    serializer_class = ProductCategorySerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["name"]
    permission_classes = [permissions.IsAuthenticated]


class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated]


class CartItemView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        """Create a new cart item for user"""
        data = request.data
        product_id = data.get("product_id")
        quantity = int(data.get("quantity", 1))
        user = request.user
        product = Product.objects.get(id=product_id)
        stock = product.stock
        if stock < quantity:
            return JsonResponse(
                {"message": "Insufficient stock"}, status=status.HTTP_400_BAD_REQUEST
            )
        CartItem.objects.update_or_create(
            user=user,
            product=product,
            defaults={
                "price": product.price,
                "quantity": quantity,
                "amount": product.price * quantity,
            },
        )
        return JsonResponse(
            {"message": "Cart item created successfully"}, status=status.HTTP_201_CREATED
        )

    def get(self, request):
        """Get all cart items for user"""
        user = request.user
        cart_items = CartItem.objects.filter(user=user)
        serializer = CartItemSerializer(cart_items, many=True)
        return JsonResponse(serializer.data, safe=False)

    def delete(self, request):
        """Delete a cart item for user"""
        data = request.data
        product_id = data.get("product_id", None)
        user = request.user
        if product_id:
            CartItem.objects.filter(product_id=product_id, user=user).delete()
        else:
            CartItem.objects.filter(user=user).delete()
        return JsonResponse(
            {"message": "Cart item deleted successfully"}, status=status.HTTP_200_OK
        )

    def put(self, request):
        """Update a cart item for user"""
        data = request.data
        product_id = data.get("product_id")
        quantity = int(data.get("quantity"))
        user = request.user
        cart_item = CartItem.objects.get(product_id=product_id, user=user)
        stock = cart_item.product.stock
        if stock < quantity:
            return JsonResponse(
                {"message": "Insufficient stock"}, status=status.HTTP_400_BAD_REQUEST
            )
        cart_item.quantity = quantity
        cart_item.amount = cart_item.price * quantity
        cart_item.save()
        return JsonResponse(
            {"message": "Cart item updated successfully"}, status=status.HTTP_200_OK
        )
