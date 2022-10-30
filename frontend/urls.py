from django.urls import path
from .views import *

urlpatterns = [
    path('', client),
    path('salesperson/', client),
    path('employee/', client),
    path('supplier/', client),
    path('addcustomer/', client),
    path('placeorder/', client),
    path('addproduct/', client),
    path('addparts/', client),
    path('assignsupplier/', client),
    path('inventory/', client),
]
