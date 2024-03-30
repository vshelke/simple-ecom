import requests
from django.core.management.base import BaseCommand
from ecom.models import Product, ProductCategory


class Command(BaseCommand):
    help = "Load the product data from fakestoreapi."

    def handle(self, *args, **options):
        """Load the product data from fakestoreapi."""
        response = requests.get("https://fakestoreapi.com/products")
        data = response.json()
        records = {
            "categories": {
                "created": 0,
                "updated": 0,
            },
            "products": {
                "created": 0,
                "updated": 0,
            },
        }
        for item in data:
            category, is_category_created = ProductCategory.objects.get_or_create(
                name=item["category"]
            )
            _, is_product_created = Product.objects.update_or_create(
                id=item["id"],
                defaults=dict(
                    title=item["title"],
                    description=item["description"],
                    price=item["price"],
                    image=item["image"],
                    category=category,
                ),
            )
            if is_category_created:
                records["categories"]["created"] += 1
            else:
                records["categories"]["updated"] += 1
            if is_product_created:
                records["products"]["created"] += 1
            else:
                records["products"]["updated"] += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"Successfully loaded the product data.\n"
                f"Categories: {records['categories']}\n"
                f"Products: {records['products']}"
            )
        )
