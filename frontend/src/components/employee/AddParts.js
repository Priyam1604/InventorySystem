import React, { useEffect, useState } from "react";
import EmployeeContainer from ".";
import apiClient from "../../request";
import { getData, handleChange } from "../common/utils";

const Child = ({ handleSubmit, info, setInfo, products }) => (
  <div className="card container mt-5 col-md-4 shadow">
    <div className="card-body">
      <h1 className="mb-4 text-center">Add Parts</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Part name</label>
          <input
            required
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={(event) => handleChange(event.target, info, setInfo)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Product</label>
          <select
            required
            className="form-control"
            name="product_id"
            value={info.product_id}
            onChange={(event) => handleChange(event.target, info, setInfo)}
          >
            <option value={""}>Choose</option>
            {products?.map((item) => (
              <option value={item.id}>{item.title}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="username">Part Quantity</label>
          <input
            required
            type="number"
            className="form-control"
            id="name"
            name="no_parts_left"
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

function AddParts() {
  const inital = { product_id: "", name: "",no_parts_left:0 };
  const [info, setInfo] = useState(inital);
  const [products, setProducts] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { ok, data } = await apiClient.post("parts/", info);
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
      setProducts(data.products);
    }
  };

  useEffect(() => {
    getData("product/");
  }, []);
  return (
    <EmployeeContainer
      active="add parts"
      element={
        <Child
          products={products}
          handleChange={handleChange}
          info={info}
          setInfo={setInfo}
          handleSubmit={handleSubmit}
        />
      }
    />
  );
}

export default AddParts;
