from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import *

from rest_framework.authentication import SessionAuthentication, BasicAuthentication 

class CsrfExemptSessionAuthentication(SessionAuthentication):

    def enforce_csrf(self, request):
        return  



class Login(APIView):
    permission_classes = ()
    authentication_classes = ()
    def get(self,request,format=None):
        name = request.GET.get('name')
        password = request.GET.get('password')
        user = request.GET.get('user')
        
        print(user,name)

        if user == 'sales':
            try:
                
                sales = SalesPerson.objects.get(name=name)
                check_pass = True if password == sales.password else False
                if check_pass:
                    request.session['sales'] = sales.id
                    return Response({'success':'Sales person autheticated',"name":sales.name},status=status.HTTP_200_OK)
                return Response({'error':'Salesperson password invalid'},status=status.HTTP_400_BAD_REQUEST)
                    
            except Exception as err:
                return Response({'error':'There is no valid salesperson account'},status=status.HTTP_401_UNAUTHORIZED)
        elif user == 'employee':
            try:
                employee = Employee.objects.filter(name=name,password=password)
                if employee:
                    request.session['employee'] = employee[0].id
                    return Response({'success':'Employee autheticated',"name":employee[0].name},status=status.HTTP_200_OK)
                return Response({'error':'Employee account invalid'},status=status.HTTP_400_BAD_REQUEST)
            except Exception as err:
                return Response({'error':f'There is no valid Employee account {err}'},status=status.HTTP_401_UNAUTHORIZED)
        elif user == 'supplier':
            try:
                supplier = Supplier.objects.filter(name=name,password=password)
                if supplier:
                    request.session['supplier'] = supplier[0].id
                    return Response({'success':'supplier autheticated',"name":supplier[0].name},status=status.HTTP_200_OK)
                return Response({'error':'supplier account invalid'},status=status.HTTP_400_BAD_REQUEST)
            except Exception as err:
                return Response({'error':'There is no valid supplier account'},status=status.HTTP_401_UNAUTHORIZED)
        
        else:
            return Response({'error':'There is no valid account'},status=status.HTTP_401_UNAUTHORIZED)

    
    def delete(self,request,format=None):
        user = request.GET.get('user')
        if user:
            del request.session[user];
            return Response({'success':'session has deleted'},status=status.HTTP_201_CREATED)
        return Response({'error':'No user'},status=status.HTTP_400_BAD_REQUEST)



class CustomerView(APIView):
    serializer_class = CustomerSerializer
    authentication_classes = (CsrfExemptSessionAuthentication,)

    def get(self,request,format=None):
        customers = Customer.objects.all()
        parts = Part.objects.all()
        list_of_customer = self.serializer_class(customers,many=True).data
        list_of_parts = PartsSerializer(parts,many=True).data

        return Response({'customers':list_of_customer,'parts':list_of_parts},status=status.HTTP_200_OK)
    def post(self,request,format=None):
        
        sales = request.session.get('sales',1)
        data = request.data
        data['sale_personalId'] = sales
        serialize = self.serializer_class(data=data)
        if serialize.is_valid():
            serialize.save()
            return Response({'success':'Customer has created'},status=status.HTTP_201_CREATED)
        return Response(serialize.errors,status=status.HTTP_400_BAD_REQUEST)


class ProductView(APIView):
    serializer_class = ProductSerializer
    authentication_classes = (CsrfExemptSessionAuthentication,)

    def get(self,request,format=None):
        products = Product.objects.all()
        list_products = self.serializer_class(products,many=True).data
        return Response({'products':list_products},status=status.HTTP_200_OK)

    def post(self,request,format=None):
        serialize = self.serializer_class(data=request.data)
        if serialize.is_valid():
            serialize.save()
            return Response({'success':'Product has created'},status=status.HTTP_201_CREATED)
        return Response(serialize.errors,status=status.HTTP_400_BAD_REQUEST)


class PartsView(APIView):
    serializer_class = PartsSerializer
    authentication_classes = (CsrfExemptSessionAuthentication,)

    def get(self,request,format=None):
        parts = Part.objects.all()
        list_of_parts = self.serializer_class(parts,many=True).data
        return Response({'parts':list_of_parts},status=status.HTTP_200_OK)

    def post(self,request,format=None):
        serialize = self.serializer_class(data=request.data)
        if serialize.is_valid():
            serialize.save()
            return Response({'success':'Part has added'},status=status.HTTP_201_CREATED)
        return Response(serialize.errors,status=status.HTTP_400_BAD_REQUEST)

    def put(self,request,format=None):
        part_id = request.data['part_id']
        if part_id:
            try:
                part_obj = Part.objects.get(id=part_id)
                serialize = self.serializer_class(part_obj,data=request.data)
                print(serialize)
                if serialize.is_valid():
                    serialize.save()
                    return Response({'success':'Part details has updated'},status=status.HTTP_200_OK)
                return Response(serialize.errors,status=status.HTTP_400_BAD_REQUEST)
            except Exception as err:
                return Response({'error':f'Part is not exist {err}'},status=status.HTTP_400_BAD_REQUEST)
        return Response({'error':'There is no part id on request'},status=status.HTTP_400_BAD_REQUEST)

    def delete(self,request,format=None):
        part_id = request.GET.get('part_id')
        if part_id:
            Part.objects.filter(id=part_id).delete()
            return Response({'success':'Part has deleted'},status=status.HTTP_200_OK)
        return Response({'error':'There is no part id on request'},status=status.HTTP_400_BAD_REQUEST)


class SupplierView(APIView):
    serializer_class = SupplierOrderSerializer

    def get(self,request,format=None):
        suppliers = Supplier.objects.all()
        list_suppliers = self.serializer_class(suppliers,many=True).data

        orders = OrderLine.objects.filter(status='Pending')
        list_orders = OrderSerializer(orders,many=True).data

        return Response({'suppliers':list_suppliers,'orders':list_orders},status=status.HTTP_200_OK)

class OrderView(APIView):
    serializer_class = OrderSerializer
    authentication_classes = (CsrfExemptSessionAuthentication,)

    def get(self,request,format=None):
        orders = OrderLine.objects.all()
        list_orders = self.serializer_class(orders,many=True).data
        return Response({'orders':list_orders},status=status.HTTP_200_OK)

    def put(self,request,format=None):
        order_id = request.data['order_id']
        if order_id:
            try:
                order_obj = OrderLine.objects.get(id=order_id)
                serialize = self.serializer_class(order_obj,data=request.data)
                if serialize.is_valid():
                    serialize.save(status='Pending' if not request.data['status'] else request.data['status'])
                    return Response({'success':'Order details has updated'},status=status.HTTP_200_OK)
                return Response(serialize.errors,status=status.HTTP_400_BAD_REQUEST)
            except Exception as err:
                return Response({'error':f'order has error {err}'},status=status.HTTP_400_BAD_REQUEST)
        return Response({'error':'There is no order id on request'},status=status.HTTP_400_BAD_REQUEST)

    def post(self,request,format=None):
        serialize = self.serializer_class(data=request.data)
        if serialize.is_valid():
            obj = serialize.save(status='Pending')
            qty = max(0,int(obj.part_id.no_parts_left - int(request.data['qty'])))
            Part.objects.filter(id=request.data['part_id']).update(no_parts_left=qty)
            return Response({'success':'Order has created'},status=status.HTTP_201_CREATED)
        return Response(serialize.errors,status=status.HTTP_400_BAD_REQUEST)


    def delete(self,request,format=None):
        order_id = request.GET.get('order_id')
        if order_id:
            OrderLine.objects.filter(id=order_id).delete()
            return Response({'success':'Order has deleted'},status=status.HTTP_200_OK)
        return Response({'error':'There is no order id on request'},status=status.HTTP_400_BAD_REQUEST)




class PurchaseOrderView(APIView):
    serializer_class = PurchaseOrderSerializer
    authentication_classes = (CsrfExemptSessionAuthentication,)

    def get(self,request,format=None):
        supplier_id = request.session.get('supplier')
        purchases = PurchaseOrder.objects.filter(supplier_id__id=supplier_id)
        list_purchases = self.serializer_class(purchases,many=True).data
        return Response({'purchases':list_purchases},status=status.HTTP_200_OK)

    def put(self,request,format=None):
        purchase_id = request.data['purchase_id']
        if purchase_id:
            try:
                purchase_obj = PurchaseOrder.objects.get(id=purchase_id)
                serialize = self.serializer_class(purchase_obj,data=request.data)
                if serialize.is_valid():
                    serialize.save()
                    OrderLine.objects.filter(id=request.data['order_id']).update(status=request.data['status'])
                    return Response({'success':'Purchase order details has updated'},status=status.HTTP_200_OK)
                return Response(serialize.errors,status=status.HTTP_400_BAD_REQUEST)
            except Exception as err:
                return Response({'error':f'purchase order has error {err}'},status=status.HTTP_400_BAD_REQUEST)
        return Response({'error':'There is no purchase id on request'},status=status.HTTP_400_BAD_REQUEST)
    
    def post(self,request,format=None):
        sales = request.session.get('employee',1)
        data = request.data
        data['employee_id'] = sales

        serialize = self.serializer_class(data=data)
        if serialize.is_valid():
            serialize.save(status='Pending')
            OrderLine.objects.filter(id=request.data['order_id']).update(status='Assigned')
            return Response({'success':'Purchase order has created'},status=status.HTTP_201_CREATED)
        return Response(serialize.errors,status=status.HTTP_400_BAD_REQUEST)


class InventoryView(APIView):
    def get(self,request,format=None):
        list_of_orders = []

        for item in OrderLine.objects.all():
            customer = item.customer_id.name
            product = f'{item.part_id.product_id.title}-{item.part_id.name}'
            list_of_orders.append({
                'user':'Customer',
                'name':customer,
                'product':product,
                'qty':item.qty,
                'date':item.order_date,
                'status':item.status,
                'type':'Sell'
            })

        for item in PurchaseOrder.objects.all():
            customer = item.supplier_id.name
            product = f'{item.order_id.part_id.product_id.title}-{item.order_id.part_id.name}'
            list_of_orders.append({
                'user':'Supplier',
                'name':customer,
                'product':product,
                'qty':item.qty,
                'date':item.order_date,
                'status':item.status,
                'type':'Purchase'
            })
        
        return Response(list_of_orders,status=status.HTTP_200_OK)