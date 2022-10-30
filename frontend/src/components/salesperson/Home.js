import React,{useEffect,useState} from "react";
import SaleContainer from ".";
import apiClient from "../../request";
import { handleChange } from "../common/utils";
import Modal from "../common/Modal";

const ModalBody = ({ handleSubmit, info, setInfo }) => (
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label htmlFor="username">Product</label>
      <input
        readOnly
        type="text"
        value={info.product_part}
        className="form-control"
        id="name"
      />
    </div>
    
    <div className="form-group">
      <label htmlFor="username">Quantity</label>
      <input
        type="text"
        name="qty"
        value={info.qty}
        className="form-control"
        id="name"
        onChange={(event) => handleChange(event.target, info, setInfo)}

      />
    </div>

    <button type="submit" className="btn btn-primary">
      Submit
    </button>
  </form>
);
export default function SaleHome() {
  const [orders, setOrders] = useState([]);
  const [modal, setModal] = useState(false);
  const [info, setInfo] = useState({});

  const getData = async (url) => {
    let { ok, data } = await apiClient.get(url);
    if (ok) {
      setOrders(data.orders);
    }
  };


  const onSubmit = async(event) => {
    event.preventDefault()
    const value = {...info}
    value['order_id'] = info.id
    const {ok,data} = await apiClient.put('order/',value)
    if(ok){
      alert(data.success)
      getData("order/");
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
    getData("order/");
  }, []);


  const onDelete = async (deleteID) => {
    const {ok,data} = await apiClient.delete('order/',{order_id:deleteID})
    if(ok){
      alert(data.success)
      getData('order/')
    }
  }

  let count = 0;
  return (
    <SaleContainer
      active={"home"}
      element={
        <>
          <div class="col-sm-12">
            <div class="white-box">
              <h2 class="box-title">Customer Orders</h2>

              <div class="table-responsive">
                <table class="table text-nowrap">
                  <thead>
                    <tr>
                      <th class="border-top-0">#</th>
                      <th class="border-top-0">Customer</th>
                      <th class="border-top-0">Product</th>
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
                          <td>{order.customer}</td>
                          <td>{order.product_part}</td>
                          <td>{order.qty}</td>
                          <td>{new Date(order.order_date).toDateString()}</td>
                          <td>{order.status}</td>
                          <td >
                            <button className="btn btn-info mr-2" style={{marginRight:'12px !important'}} onClick={() => toggleModal(order)}>Edit</button>
                            <button className="btn btn-danger  " onClick={() => onDelete(order.id)}>Delete</button>
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
