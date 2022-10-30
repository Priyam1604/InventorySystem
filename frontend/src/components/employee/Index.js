import React from "react";
import { Link } from "react-router-dom";
import Home from "../common/Home";

function EmployeeContainer({ element, active }) {
  const sidebar = [
    {
      name: "home",
      icon: "far fa-clock",
      url: "/employee/",
    },
    {
      name: "add product",
      icon: "far fa-user",
      url: "/addproduct/",
    },
    {
      name: "add parts",
      icon: "far fa-user",
      url: "/addparts/",
    },
    {
      name: "assign supplier",
      icon: "far fa-user",
      url: "/assignsupplier/",
    },
    {
      name: "inventory",
      icon: "far fa-user",
      url: "/inventory/",
    },
  ];

 
  return (
    <Home
      user="employee"
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

export default EmployeeContainer;
