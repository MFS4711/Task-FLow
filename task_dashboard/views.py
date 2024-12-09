from django.shortcuts import render, get_object_or_404
from django.contrib.auth.models import User
from .models import Task
from django.http import Http404

# Create your views here.

def homepage(request):

    return render(request, "task_dashboard/index.html")


def dashboard(request, user_id):
    
    # Fetch the user by user_id
    user = get_object_or_404(User, id=user_id)

    # Ensure that the logged-in user can only view their own dashboard
    if user != request.user:
        # Raise 404 if the logged-in user tries to access another user's dashboard
        raise Http404("You do not have permission to view this page.")
    
    # Fetch tasks for the specific user (only the logged-in user’s tasks)
    tasks = Task.objects.filter(author=user).order_by('-status', '-due_date')

    # Context to pass to the template
    context = {
        "user": user,
        "tasks": tasks,
    }

    # Render the dashboard page for the specific user
    return render(request, "task_dashboard/dashboard.html", context)