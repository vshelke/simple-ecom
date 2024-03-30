from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from . import models


class BaseUserAdmin(UserAdmin):
    def __init__(self, *args, **kwargs):
        super(BaseUserAdmin, self).__init__(*args, **kwargs)

    search_fields = [
        "username",
        "first_name",
        "last_name",
        "email",
    ]
    save_as = True


admin.site.register(models.BaseUser, BaseUserAdmin)
