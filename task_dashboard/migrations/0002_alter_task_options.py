# Generated by Django 4.2.16 on 2024-12-04 12:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('task_dashboard', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='task',
            options={'ordering': ['-status']},
        ),
    ]
