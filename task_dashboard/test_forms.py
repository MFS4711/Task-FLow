from django.test import TestCase
from .forms import TaskForm

# Create your tests here.
class TestTaskForm(TestCase):

    def test_form_is_valid(self):
        """ Test for all fields"""
        task_form = TaskForm({
            'title': 'This is a Title',
            'description': 'This is a description',
            'due_date': '2024-12-31T15:30',
            'status': 0,
        })
        self.assertTrue(task_form.is_valid(), msg="Form is not valid")