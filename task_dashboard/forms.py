from .models import Task
from django import forms

class TaskForm(forms.ModelForm):
    class Meta:
        model = Task
        fields = ('title', 'description', 'due_date', 'status',)

        # Customize the 'due_date' field to use a DateTimeInput widget
        widgets = {
            'due_date': forms.DateTimeInput(attrs={
                'type': 'datetime-local',  # HTML5 datetime-local input type
                'class': 'form-control',    # Optional for styling
            }),
        }