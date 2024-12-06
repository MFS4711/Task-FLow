from django.apps import AppConfig


class TaskDashboardConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'task_dashboard'
    
    def ready(self):
        # Import and connect the signals when the app is ready
        import task_dashboard.signals
