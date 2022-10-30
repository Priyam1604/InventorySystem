import React from "react";
import { Link } from "react-router-dom";
import Home from "../common/Home";

function SaleContainer({ element, active }) {
  const sidebar = [
    {
      name: "home",
      icon: "far fa-clock",
      url: "/salesperson/",
    },
    {
      name: "add customer",
      icon: "far fa-user",
      url: "/addcustomer/",
    },
    {
      name: "place order",
      icon: "far fa-user",
      url: "/placeorder/",
    },
  ];

  const SaleHome = () => (
    <>
      <h1>Homepage</h1>
    </>
  );

  return (
    <Home
      user="sales"
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

export default SaleContainer;
