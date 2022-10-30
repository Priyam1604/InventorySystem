from django.db import models
from  datetime import datetime

class SalesPerson(models.Model):
    name = models.CharField(max_length=100,default='')
    password = models.CharField(max_length=200,default='')
    address = models.TextField()

class Employee(models.Model):
    emp_id = models.CharField(max_length=200,default='')
    name = models.CharField(max_length=100,default='')
    password = models.CharField(max_length=200,default='')
    address = models.TextField()

class Supplier(models.Model):
    name = models.CharField(max_length=100,default='')
    password = models.CharField(max_length=200,default='')
    address = models.TextField()

class Customer(models.Model):
    sale_personalId = models.ForeignKey(SalesPerson, on_delete=models.CASCADE)
    name = models.CharField(max_length=100,default='')
    address = models.TextField()
    created_date = models.DateTimeField(default=datetime.now)

class Product(models.Model):
    title = models.CharField(max_length=100,default='')
    created_date = models.DateTimeField(default=datetime.now)

class Part(models.Model):
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE)
    name = models.CharField(max_length=100,default='')
    no_parts_left = models.IntegerField()

class OrderLine(models.Model):
    part_id =  models.ForeignKey(Part, on_delete=models.CASCADE)
    customer_id =  models.ForeignKey(Customer, on_delete=models.CASCADE)
    qty = models.IntegerField()
    order_date = models.DateTimeField(default=datetime.now)
    status = models.CharField(max_length=50,default='')

class PurchaseOrder(models.Model):
    order_id =  models.ForeignKey(OrderLine, on_delete=models.CASCADE)
    supplier_id =  models.ForeignKey(Supplier, on_delete=models.CASCADE)
    employee_id =  models.ForeignKey(Employee, on_delete=models.CASCADE)
    qty = models.IntegerField()
    order_date = models.DateTimeField(default=datetime.now)
    status = models.CharField(max_length=50,default='')

