# Generated by Django 5.0.3 on 2024-04-01 16:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("ecom", "0001_initial"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="product",
            options={
                "ordering": ["id"],
                "verbose_name": "Product",
                "verbose_name_plural": "Products",
            },
        ),
        migrations.AlterModelOptions(
            name="productcategory",
            options={
                "ordering": ["id"],
                "verbose_name": "Product Category",
                "verbose_name_plural": "Product Categories",
            },
        ),
    ]
