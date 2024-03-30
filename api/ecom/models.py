from django.db import models

class ProductCategory(models.Model):
    name = models.CharField(max_length=255, unique=True)

    class Meta:
        db_table = "product_category"
        verbose_name = "Product Category"
        verbose_name_plural = "Product Categories"

    def __str__(self):
        return self.name


class Product(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.URLField()
    category = models.ForeignKey(ProductCategory, on_delete=models.CASCADE, related_name="products")

    class Meta:
        db_table = "product"
        verbose_name = "Product"
        verbose_name_plural = "Products"
        unique_together = (("title", "category"),)

    def __str__(self):
        return self.name


class ProductStock(models.Model):
    quantity = models.PositiveIntegerField()
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="stocks", unique=True)

    class Meta:
        db_table = "product_stock"
        verbose_name = "Product Stock"
        verbose_name_plural = "Product Stocks"

    def __str__(self):
        return self.product.title


class ProductRating(models.Model):
    rating = models.DecimalField(max_digits=2, decimal_places=1)
    user = models.ForeignKey("core.BaseUser", on_delete=models.CASCADE, related_name="ratings")
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="ratings")

    class Meta:
        db_table = "product_rating"
        verbose_name = "Product Rating"
        verbose_name_plural = "Product Ratings"
        unique_together = (("product", "user"),)

    def __str__(self):
        return self.product.title


class CartItem(models.Model):
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    user = models.ForeignKey("core.BaseUser", on_delete=models.CASCADE, related_name="cart_items")
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="cart_items")

    class Meta:
        db_table = "cart"
        verbose_name = "Cart"
        verbose_name_plural = "Carts"
        unique_together = (("product", "user"),)

    def __str__(self):
        return self.user.username
