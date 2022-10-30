from django.urls import path
from .views import *
urlpatterns = [
    path('login/',Login.as_view()),
    path('customer/',CustomerView.as_view()),
    path('supplier/',SupplierView.as_view()),
    path('product/',ProductView.as_view()),
    path('parts/',PartsView.as_view()),
    path('order/',OrderView.as_view()),
    path('inventory/',InventoryView.as_view()),
    path('purchases/',PurchaseOrderView.as_view()),
]
