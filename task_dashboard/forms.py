from .models import Task
from django import forms
from django.core.exceptions import ValidationError
from django.utils import timezone

class TaskForm(forms.ModelForm):
    class Meta:
        model = Task
        fields = ('title', 'description', 'due_date', 'status',)

        # Customize the 'due_date' field to use a DateTimeInput widget
        widgets = {
            'due_date': forms.DateTimeInput(format='%Y-%m-%dT%H:%M', attrs={
                'type': 'datetime-local',  # HTML5 datetime-local input type
                'class': 'form-control',    # Optional for styling
                'min': timezone.now().strftime('%Y-%m-%dT%H:%M'),  # Disable past dates
            }),
        }
    
    def clean_due_date(self):
        """Ensure the due_date is in the future."""
        due_date = self.cleaned_data.get('due_date')
        
        # Check if the due_date is in the future
        if due_date and due_date <= timezone.now():
            raise ValidationError("The due date must be in the future.")
        
        return due_date