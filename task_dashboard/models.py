from django.db import models
from django.contrib.auth.models import User

STATUS = ((0, "Not Started"), (1, "In Progress"), (2, "Completed"), (2, "Overdue"))

# Create your models here.
class Task(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    due_date = models.DateTimeField()
    status = models.IntegerField(choices=STATUS, default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_tasks")
