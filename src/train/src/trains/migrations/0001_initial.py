# Generated by Django 5.1.2 on 2024-10-24 09:35

import django.db.models.deletion
import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Route',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('source', models.CharField(max_length=100)),
                ('destination', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Train',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField()),
                ('num_coaches', models.IntegerField(default=5)),
                ('num_seat_per_coach', models.IntegerField(default=55)),
            ],
        ),
        migrations.CreateModel(
            name='Schedule',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('fare', models.FloatField()),
                ('date', models.DateField()),
                ('route', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='trains.route')),
            ],
        ),
        migrations.CreateModel(
            name='Seat',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('seat_number', models.IntegerField()),
                ('is_booked', models.BooleanField(default=False)),
                ('schedule', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='trains.schedule')),
            ],
        ),
        migrations.AddField(
            model_name='route',
            name='train',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='trains.train'),
        ),
    ]
