import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import AddParts from "./components/employee/AddParts";
import AddProduct from "./components/employee/AddProduct";
import AssignSupplier from "./components/employee/AssignSupplier";
import EmployeeHome from "./components/employee/Home";
import Inventory from "./components/employee/Inventory";

import Login from "./components/Login";
import AddCustomer from "./components/salesperson/addCustomer";
import SaleHome from "./components/salesperson/Home";
import PlaceOrder from "./components/salesperson/placeOrder";
import SupplierHome from "./components/supplier/Home";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/salesperson" exact element={<SaleHome />} />
        <Route path="/addcustomer" element={<AddCustomer />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/addparts" element={<AddParts />} />
        <Route path="/assignsupplier" element={<AssignSupplier />} />
        <Route path="/employee" exact element={<EmployeeHome />}></Route>
        <Route path="/supplier" exact element={<SupplierHome />} / >
        <Route path="/inventory" exact element={<Inventory />} / >
      </Routes>
    </div>
  );
}

export default App;
