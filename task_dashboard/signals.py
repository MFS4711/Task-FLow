from django.shortcuts import redirect
from django.contrib.auth.signals import user_logged_in
from django.urls import reverse
from django.dispatch import receiver

@receiver(user_logged_in)
def custom_login_redirect(sender, request, user, **kwargs):
    """
    Redirects the user to their dashboard after login.
    """
    print(f"User {user.username} logged in!")  # Debugging to see if it's triggered
    # Ensure redirection to the correct dashboard
    return redirect(reverse('dashboard', kwargs={'user_id': user.id}))