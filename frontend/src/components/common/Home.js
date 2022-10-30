import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "./utils";

function Home({element,sidebar,user}) {
  const history = useNavigate()
  return (
    <div
      id="main-wrapper"
      data-layout="vertical"
      data-navbarbg="skin5"
      data-sidebartype="full"
      data-sidebar-position="absolute"
      data-header-position="absolute"
      data-boxed-layout="full"
    >
      <header class="topbar" data-navbarbg="skin5">
        <nav class="navbar top-navbar navbar-expand-md navbar-dark">
          <div
            class="navbar-collapse collapse"
            id="navbarSupportedContent"
            data-navbarbg="skin5"
          >
            <ul class="navbar-nav ms-auto d-flex align-items-center">
              <li>
                <a class="profile-pic" href="#">
                  <img
                    src="https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
                    alt="user-img"
                    width="36"
                    class="img-circle"
                  />
                  <span class="text-white font-medium">{localStorage.getItem('username') || 'steve'}</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <aside class="left-sidebar" data-sidebarbg="skin6">
        <div class="scroll-sidebar">
          <nav class="sidebar-nav">
            <ul id="sidebarnav">
              
              {sidebar}
            </ul>
          </nav>
        </div>
      </aside>

      <div class="page-wrapper">
        <div class="page-breadcrumb bg-white">
          <div class="row align-items-center">
            <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
              {/* <h4 class="page-title">Dashboard</h4> */}
            </div>
            <div class="col-lg-9 col-sm-8 col-md-8 col-xs-12">
              <div class="d-md-flex">
                <ol class="breadcrumb ms-auto">
                  <li>
                    {/* <a href="#" class="fw-normal">
                      Dashboard
                    </a> */}
                  </li>
                </ol>
                <button
                  onClick={() => logout(user,history)}
                  target="_blank"
                  class="btn btn-danger  d-none d-md-block pull-right ms-3 hidden-xs hidden-sm waves-effect waves-light text-white"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="container-fluid">{element}</div>
        <footer class="footer text-center">
          {" "}
          2022 © Part Management System
        </footer>
      </div>
    </div>
  );
}

export default Home;
