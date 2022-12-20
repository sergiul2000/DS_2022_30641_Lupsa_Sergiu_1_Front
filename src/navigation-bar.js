import React from "react";

// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";

import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarBrand,
  NavLink,
  UncontrolledDropdown,
} from "reactstrap";

import logo from "./commons/images/icon.png";

const textStyle = {
  color: "white",
  textDecoration: "none",
};

function NavigationBar() {
  return (
    <div>
      <Navbar color="dark" light expand="md">
        <NavbarBrand href="/">
          <img src={logo} width={"50"} height={"35"} />
        </NavbarBrand>
        <Nav className="mr-auto" navbar>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle style={textStyle} nav caret>
              Menu
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                <NavLink href="/person">Persons</NavLink>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <NavLink style={{ color: "white" }} href="/login">
            Login
          </NavLink>
          <NavLink style={{ color: "white" }} href="/register">
            Register
          </NavLink>
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavigationBar;
