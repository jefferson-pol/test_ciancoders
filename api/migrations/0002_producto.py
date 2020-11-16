# Generated by Django 2.2.17 on 2020-11-13 19:52

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Producto',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=120)),
                ('precio', models.DecimalField(decimal_places=2, max_digits=7)),
                ('cantidad', models.IntegerField()),
                ('vendedor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='vendedor', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]