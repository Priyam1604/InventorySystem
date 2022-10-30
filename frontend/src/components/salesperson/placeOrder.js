import React, { useEffect, useState } from "react";
import SaleContainer from ".";
import apiClient from "../../request";
import { getData, handleChange } from "../common/utils";

const Child = ({ handleSubmit, info, setInfo, customers, parts }) => (
  <div className="card container mt-5 col-md-4 shadow">
    <div className="card-body">
      <h1 className="mb-4 text-center">Place order </h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Customer</label>
          <select
            required
            className="form-control"
            name="customer_id"
            value={info.customer_id}
            onChange={(event) => handleChange(event.target, info, setInfo)}
          >
            <option value={""}>Choose</option>
            {customers?.map((item) => (
              <option value={item.id}>{item.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="username">Parts</label>
          <select
            required
            className="form-control"
            name="part_id"
            value={info.part_id}
            onChange={(event) => handleChange(event.target, info, setInfo)}
          >
            <option value={""}>Choose</option>
            {parts?.map(
              (item) =>
                parseInt(item.no_parts_left) > 0 && (
                  <option value={item.id}>{item.name}</option>
                )
            )}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="username">Quantity</label>
          <input
            required
            type="number"
            className="form-control"
            id="name"
            name="qty"
            onChange={(event) => handleChange(event.target, info, setInfo)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  </div>
);

function PlaceOrder() {
  const inital = { part_id: "", customer_id: "", qty: 0 };
  const [info, setInfo] = useState(inital);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(info);
    const { ok, data } = await apiClient.post("order/", info);
    if (ok) {
      alert(data.success);
      window.location.reload();
    } else {
      console.log(data, "error");
      alert("something went wrong");
    }
  };

  const getData = async (url) => {
    let { ok, data } = await apiClient.get(url);
    if (ok) {
      setCustomers(data.customers);
      setProducts(data.parts.filter((item) => item.no_parts_left > 0));
    }
  };

  useEffect(() => {
    getData("customer/");
  }, []);

  return (
    <SaleContainer
      active={"place order"}
      element={
        <Child
          parts={products}
          customers={customers}
          handleChange={handleChange}
          info={info}
          setInfo={setInfo}
          handleSubmit={handleSubmit}
        />
      }
    />
  );
}

export default PlaceOrder;
