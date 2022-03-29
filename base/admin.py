from django.contrib import admin
from django.contrib.sessions.models import Session

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


class SessionAdmin(admin.ModelAdmin):
    def _session_data(self, obj):
        return obj.get_decoded()
    list_display = ['session_key', '_session_data', 'expire_date']


admin.site.register(Session, SessionAdmin)
