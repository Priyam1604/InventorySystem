import React, { useEffect, useState } from "react";
import EmployeeContainer from ".";
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
        value={info.product}
        className="form-control"
        id="name"
      />
    </div>
    <div className="form-group">
      <label htmlFor="username">Part Name</label>
      <input
        type="text"
        name="name"
        value={info.name}
        className="form-control"
        id="name"
        onChange={(event) => handleChange(event.target, info, setInfo)}
      />
    </div>
    <div className="form-group">
      <label htmlFor="username">Quantity</label>
      <input
        type="text"
        name="no_parts_left"
        value={info.no_parts_left}
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

export default function EmployeeHome() {
  const [products, setProducts] = useState([]);
  const [modal, setModal] = useState(false);
  const [info, setInfo] = useState({});

  const getData = async (url) => {
    let { ok, data } = await apiClient.get(url);
    if (ok) {
      setProducts(data.parts);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const value = { ...info };
    value["part_id"] = info.id;
    const { ok, data } = await apiClient.put("parts/", value);
    if (ok) {
      alert(data.success);
      getData("parts/");
      setModal(false);
    }
  };

  const toggleModal = (partDetails) => {
    if (partDetails) {
      setInfo(partDetails);
    } else {
      setInfo({});
    }
    setModal(!modal);
  };

  useEffect(() => {
    getData("parts/");
  }, []);

  const onDelete = async (deleteID) => {
    const { ok, data } = await apiClient.delete("parts/", {
      part_id: deleteID,
    });
    if (ok) {
      alert(data.success);
      getData("parts/");
    }
  };

  let count = 0;

  return (
    <EmployeeContainer
      active={"home"}
      element={
        <>
          <div class="col-sm-12">
            <div class="white-box">
              <h2 class="box-title">Product Lists</h2>

              <div class="table-responsive">
                <table class="table text-nowrap">
                  <thead>
                    <tr>
                      <th class="border-top-0">#</th>
                      <th class="border-top-0">Product</th>
                      <th class="border-top-0">Parts </th>
                      <th class="border-top-0">Quantity</th>
                      <th class="border-top-0"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {products?.map((product) => {
                      count++;
                      return (
                        <tr>
                          <td>{count}</td>
                          <td>{product.product}</td>
                          <td>{product.name}</td>
                          <td>{product.no_parts_left}</td>
                          <td>
                            <button
                              className="btn btn-info "
                              onClick={() => toggleModal(product)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger  "
                              onClick={() => onDelete(product.id)}
                            >
                              Delete
                            </button>
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
            title={"Update Parts"}
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
