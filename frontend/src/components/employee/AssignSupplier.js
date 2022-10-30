import React,{useState,useEffect} from 'react'
import EmployeeContainer from '.'
import apiClient from "../../request";
import { getData, handleChange } from "../common/utils";

const Child = ({
  handleSubmit,
  info,
  setInfo,
  orders,
  suppliers,
}) => (
  <div className="card container mt-5 col-md-4 shadow">
    <div className="card-body">
      <h1 className="mb-4 text-center">Assign Supplier</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Order</label>
          <select
            required
            className="form-control"
            name="order_id"
            value={info.order_id}
            onChange={(event) => handleChange(event.target, info, setInfo)}
          >
            <option value={''}>Choose</option>
            {orders?.map((item) => (
              <option value={item.id}>{item.product_part}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="username">Supplier</label>
          <select
            required
            className="form-control"
            name="supplier_id"
            value={info.supplier_id}
            onChange={(event) => handleChange(event.target, info, setInfo)}
          >
            <option value={''}>Choose</option>
            {suppliers?.map((item) => (
              <option value={item.id}>{item.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  </div>
);
function AssignSupplier() {
  const inital = { order_id: "", supplier_id: "" };
  const [info, setInfo] = useState(inital);
  const [orders, setOrders] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let qty = 0
    orders.map(item => {
      if(item.id === parseInt(info.order_id)){
        qty = item.qty
      }
    })


    const { ok, data } = await apiClient.post("purchases/", {...info,qty});
    if (ok) {
      alert(data.success);
      window.location.reload()
    } else {
      console.log(data, "error");
      alert("something went wrong");
    }
  };

  const getData = async (url) => {
    let { ok, data } = await apiClient.get(url);
    if (ok) {
      setOrders(data.orders);
      setSuppliers(data.suppliers);
    }
  };

  useEffect(() => {
    getData("supplier/");
  }, []);
  return (
    <EmployeeContainer 
      active={'assign supplier'}
      element={
        <Child
          suppliers={suppliers}
          orders={orders}
          handleChange={handleChange}
          info={info}
          setInfo={setInfo}
          handleSubmit={handleSubmit}
        />
      }

    />
  )
}

export default AssignSupplier