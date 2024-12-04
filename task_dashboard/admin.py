from django.contrib import admin
from django_summernote.admin import SummernoteModelAdmin
from .models import Task


@admin.register(Task)
class TaskAdmin(SummernoteModelAdmin):

    list_display = ('author', 'title', 'status')
    search_fields = ['author']
    list_filter = ('status',)

# Register your models here.
# admin.site.register(Task)