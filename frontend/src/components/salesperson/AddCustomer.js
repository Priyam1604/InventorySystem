import React, { useState } from "react";
import SaleContainer from ".";
import apiClient from "../../request";
import { handleChange } from "../common/utils";

const Child = ({ handleChange, handleSubmit, info, setInfo }) => (
  <div className="card container mt-5 col-md-4 shadow">
    <div className="card-body">
      <h1 className="mb-4 text-center">Add Customer </h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Usernamse</label>
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
          <label htmlFor="username">Addresss</label>
          <textarea
            required
            type="text"
            name="address"
            className="form-control"
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

function AddCustomer() {
  const inital = { name: "", address: "" };
  const [info, setInfo] = useState(inital);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { ok, data } = await apiClient.post("customer/", info);
    if (ok) {
      alert(data.success);
      window.location.reload();
    } else {
      console.log(data, "error");
      alert("something went wrong");
    }
  };

  return (
    <SaleContainer
      active={"add customer"}
      element={
        <Child
          handleChange={handleChange}
          info={info}
          setInfo={setInfo}
          handleSubmit={handleSubmit}
        />
      }
    />
  );
}

export default AddCustomer;
