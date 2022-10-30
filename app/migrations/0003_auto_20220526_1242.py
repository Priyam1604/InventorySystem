# Generated by Django 3.2 on 2022-05-26 07:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_auto_20220525_1312'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='orderline',
            name='product_id',
        ),
        migrations.AddField(
            model_name='orderline',
            name='part_id',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='app.part'),
            preserve_default=False,
        ),
    ]
