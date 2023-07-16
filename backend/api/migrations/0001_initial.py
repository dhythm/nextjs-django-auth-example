# Generated by Django 4.2.3 on 2023-07-16 09:55

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='UserInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(db_index=True, max_length=50, unique=True)),
                ('password', models.CharField(db_index=True, max_length=100)),
                ('info', models.CharField(max_length=200)),
            ],
        ),
    ]
