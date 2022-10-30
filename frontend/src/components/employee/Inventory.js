import React, { useEffect, useState } from "react";
import EmployeeContainer from ".";
import apiClient from "../../request";


export default function Inventory() {
  const [products, setProducts] = useState([]);

  const getData = async (url) => {
    let { ok, data } = await apiClient.get(url);
    if (ok) {
      setProducts(data);
    }
  };




  useEffect(() => {
    getData("inventory/");
  }, []);

  

  let count = 0;

  return (
    <EmployeeContainer
      active={"inventory"}
      element={
        <>
          <div class="col-sm-12">
            <div class="white-box">
              <h2 class="box-title">Inventory details</h2>

              <div class="table-responsive">
                <table class="table text-nowrap">
                  <thead>
                    <tr>
                      <th class="border-top-0">#</th>
                      <th class="border-top-0">User </th>
                      <th class="border-top-0">User name </th>
                      <th class="border-top-0">Product </th>
                      <th class="border-top-0">Date </th>
                      <th class="border-top-0">Quantity</th>
                      <th class="border-top-0">Status</th>
                      <th class="border-top-0">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products?.map((product) => {
                      count++;
                      return (
                        <tr>
                          <td>{count}</td>
                          <td>{product.user}</td>
                          <td>{product.name}</td>
                          <td>{product.product}</td>
                          <td>{new Date(product.date).toDateString()}</td>
                          <td>{product.qty}</td>
                          <td>{product.status}</td>
                          <td>{product.type}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
         
        </>
      }
    />
  );
}
