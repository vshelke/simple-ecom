from rest_framework import serializers

from .models import BaseUser


class BaseUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user, _ = BaseUser.objects.update_or_create(
            email=validated_data["email"],
            username=validated_data["email"],
            defaults={
                "first_name": validated_data["first_name"],
                "last_name": validated_data["last_name"],
            },
        )
        user.set_password(validated_data["password"])
        user.save()
        return user

    class Meta:
        model = BaseUser
        fields = ("id", "email", "password", "first_name", "last_name")
