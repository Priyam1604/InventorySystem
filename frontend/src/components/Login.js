import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../request";
import { handleChange } from "./common/utils";

function Login() {
  const navigate = useNavigate();
  const [info, setInfo] = useState({ name: "", password: "", user: "" });
  const loginAreas = {
    sales: "/salesperson",
    employee: "/employee",
    supplier: "/supplier",
  };
  const loginUser = async (event) => {
    event.preventDefault();
    const { ok, data } = await apiClient.get("login/", info);

    if (!ok) {
      alert(data.error);
    }

    if (ok) {
      localStorage.setItem('username',data.name)
      navigate(loginAreas[info.user]);
    }
  };
  return (
    <div className="card container mt-5 col-md-4 shadow">
      <div className="card-body">
        <form onSubmit={loginUser}>
          <h1 className="mb-4 text-center">Login </h1>
          <div className="form-group ">
            <label htmlFor="username">User</label>

            <select
              required
              id="inputState"
              className="form-control"
              name="user"
              onChange={(event) => handleChange(event.target,info,setInfo)}
            >
              <option defaultValue>Choose User</option>
              <option value="employee">Employee</option>
              <option value="supplier">Supplier</option>
              <option value="sales">Sales</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              required
              type="text"
              className="form-control"
              id="username"
              name="name"
              onChange={(event) => handleChange(event.target,info,setInfo)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              required
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              onChange={(event) => handleChange(event.target,info,setInfo)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
