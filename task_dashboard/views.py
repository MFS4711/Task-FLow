from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.models import User
from django.contrib import messages
from .models import Task
from .forms import TaskForm
from django.http import Http404

# Create your views here.


def homepage(request):

    return render(request, "task_dashboard/index.html")


def dashboard(request, user_id):
    """
    view to display dashboard and create tasks
    """
    # Fetch the user by user_id
    user = get_object_or_404(User, id=user_id)

    # Ensure that the logged-in user can only view their own dashboard
    if user != request.user:
        # Raise 404 if the logged-in user tries to access another user's dashboard
        raise Http404("You do not have permission to view this page.")

    # Fetch tasks for the specific user (only the logged-in user’s tasks)
    tasks = Task.objects.filter(author=user).order_by('-status', '-due_date')

    # Handle Post request from Task Form
    if request.method == "POST":
        task_form = TaskForm(data=request.POST)
        if task_form.is_valid():
            task = task_form.save(commit=False)
            task.author = request.user
            task.save()
            messages.add_message(
                request, messages.SUCCESS,
                'New Task Created'
            )
            # Redirect to the same dashboard page after saving the task
            # Redirect to the dashboard with the same user_id
            return redirect('dashboard', user_id=user.id)

    # Display Form
    task_form = TaskForm()

    # Context to pass to the template
    context = {
        "user": user,
        "tasks": tasks,
        "task_form": task_form,
    }

    # Render the dashboard page for the specific user
    return render(request, "task_dashboard/dashboard.html", context)


def task_edit(request, task_id):
    """
    view to edit a task
    """
    if request.method == "POST":
        # get object you want to edit
        task = get_object_or_404(Task, pk=task_id)
        # initialises form with instance of task pre-filled
        task_form = TaskForm(data=request.POST, instance=task)
        # form validation and authentication check
        if task_form.is_valid():
            # Save the form with the updated data
            task_form.save()
            messages.add_message(request, messages.SUCCESS,
                                 'Task successfully updated!')
        else:
            messages.add_message(
                request, messages.ERROR, 'There was an error updating the task. Please try again.')
    
    # Blow with view you want to run - and in args - the necessary parameter
    return HttpResponseRedirect(reverse('dashboard', args=[task.author.id]))