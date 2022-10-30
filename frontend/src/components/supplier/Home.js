import React, { useEffect, useState } from "react";
import SupplierContainer from ".";
import apiClient from "../../request";
import Modal from "../common/Modal";
import { handleChange } from "../common/utils";

const ModalBody = ({ handleSubmit, info, setInfo }) => (
  <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Part Name</label>
          <input readOnly type="text" value={info.product_part} className="form-control" id="name" />
        </div>
        <div className="form-group">
          <label htmlFor="username">Status</label>
          <select
            name="status"
            required
            className="form-control"
            onChange={(event) => handleChange(event.target, info, setInfo)}
          >
            <option value={""}>Choose</option>
            <option value={"Processing"}>Processing</option>
            <option value={"Delivered"}>Delivered</option>
            <option value={"Canceled"}>Canceled</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
);

export default function SupplierHome() {
  const [orders, setOrders] = useState([]);
  const [modal, setModal] = useState(false);
  const [info, setInfo] = useState({});

  const getData = async (url) => {
    let { ok, data } = await apiClient.get(url);
    if (ok) {
      setOrders(data.purchases);
    }
  };


  const onSubmit = async(event) => {
    event.preventDefault()
    const value = {...info}
    value['purchase_id'] = info.id
    const {ok,data} = await apiClient.put('purchases/',value)
    if(ok){
      alert(data.success)
      getData("purchases/");
      setModal(false)

    }
  };

  const toggleModal = (orderDetials) => {
    if(orderDetials){
      setInfo(orderDetials)
    }else{
      setInfo({})
    }
    setModal(!modal);
  }

  useEffect(() => {
    getData("purchases/");
  }, []);

  let count = 0;

  return (
    <SupplierContainer
      active={"home"}
      element={
        <>
          <div class="col-sm-12">
            <div class="white-box">
              <h2 class="box-title">Purchase Order</h2>

              <div class="table-responsive">
                <table class="table text-nowrap">
                  <thead>
                    <tr>
                      <th class="border-top-0">#</th>
                      <th class="border-top-0">Part</th>
                      <th class="border-top-0">Quantity</th>
                      <th class="border-top-0">Date</th>
                      <th class="border-top-0">Status</th>
                      <th class="border-top-0"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders?.map((order) => {
                      count++;
                      return (
                        <tr>
                          <td>{count}</td>
                          <td>{order.product_part}</td>
                          <td>{order.qty}</td>
                          <td>{new Date(order.order_date).toDateString()}</td>
                          <td>{order.status}</td>
                          <td>
                            <button className="btn btn-info " onClick={() => toggleModal(order)}>Edit</button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <Modal
            title={"Update order"}
            onClose={toggleModal}
            value={modal}
            element={
              <ModalBody
                handleSubmit={onSubmit}
                info={info}
                setInfo={setInfo}
              />
            }
          />
        </>
      }
    />
  );
}
