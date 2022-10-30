import React from "react";
import { Link } from "react-router-dom";
import Home from "../common/Home";

function SupplierContainer({ element, active }) {
  const sidebar = [
    {
      name: "home",
      icon: "far fa-clock",
      url: "/supplier/",
    },
    
  ];

 
  return (
    <Home
      user="supplier"
      element={element}
      sidebar={
        <>
          {sidebar.map((nav) => (
            <li class="sidebar-item">
              <Link to={nav.url}>
                <a
                  class={`sidebar-link waves-effect waves-dark sidebar-link ${
                    active == nav.name && "active"
                  }`}
                  aria-expanded="false"
                >
                  <i class={nav.icon} aria-hidden="true"></i>
                  <span
                    class="hide-menu "
                    style={{ textTransform: "capitalize" }}
                  >
                    {nav.name}
                  </span>
                </a>
              </Link>
            </li>
          ))}
        </>
      }
    />
  );
}

export default SupplierContainer;
