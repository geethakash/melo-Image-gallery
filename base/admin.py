from django.contrib import admin

from base.models import Image, UserAvatar

# Register your models here.
# admin.site.register(Image)


@admin.register(Image)
class Images(admin.ModelAdmin):
    list_display = ['id', 'caption', 'date_added']
    list_filter = ('date_added',)
    search_fields = ('caption__startswith',)


@admin.register(UserAvatar)
class UserAvatar(admin.ModelAdmin):
    list_display = ['id', 'user', 'avatar', 'date_added']
    list_filter = ('date_added', 'user')
    search_fields = ('caption__startswith',)
