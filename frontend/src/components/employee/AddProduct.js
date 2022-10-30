import React, { useState } from "react";
import apiClient from "../../request";
import { handleChange } from "../common/utils";
import EmployeeContainer from '.'

const Child = ({ handleSubmit,info,setInfo}) => (
  <div className="card container mt-5 col-md-4 shadow">
    <div className="card-body">
      <h1 className="mb-4 text-center">Add Product </h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Product Name</label>
          <input
            required
            type="text"
            className="form-control"
            id="name"
            name="title"
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

function AddProduct() {
  const inital = { title: "" };
  const [info, setInfo] = useState(inital);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { ok, data } = await apiClient.post("product/", info);
    if(ok){
      alert(data.success)
      window.location.reload()
    }else{
      console.log(data,'error');
      alert('something went wrong')
    }
  };
  return (
    <EmployeeContainer 
      active={'add product'}
      element={
        <Child
          info={info}
          setInfo={setInfo}
          handleSubmit={handleSubmit}
        />
      }
    
    />
  )
}

export default AddProduct