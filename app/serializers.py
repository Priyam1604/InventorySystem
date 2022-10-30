from rest_framework import serializers

from .models import *


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class PartsSerializer(serializers.ModelSerializer):
    product = serializers.SerializerMethodField('getProduct')

    class Meta:
        model = Part
        fields = ['id','product_id','name','no_parts_left','product']

    def getProduct(self,obj):
        return obj.product_id.title

class OrderSerializer(serializers.ModelSerializer):
    product_part = serializers.SerializerMethodField('getProduct')
    customer = serializers.SerializerMethodField('getCustomer')
    class Meta:
        model = OrderLine
        fields = ['customer','part_id','customer_id','qty','order_date','status','product_part','id']

    def getCustomer(self,obj):
        return obj.customer_id.name

    def getProduct(self,obj):
        if(obj):
            product_name = obj.part_id.product_id.title
            part_name = obj.part_id.name
            return f'{product_name}-{part_name}'

class PurchaseOrderSerializer(serializers.ModelSerializer):
    product_part = serializers.SerializerMethodField('getProduct')

    class Meta:
        model = PurchaseOrder
        fields = ['product_part','id','order_id','supplier_id','employee_id','qty','order_date','status']

    def getProduct(self,obj):
        if(obj):
            product_name = obj.order_id.part_id.product_id.title
            part_name = obj.order_id.part_id.name
            return f'{product_name}-{part_name}'

class SupplierOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = '__all__'

    

