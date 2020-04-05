import React, { useState, style } from 'react';
import { Link, Redirect } from 'react-router-dom';

import {
  Button,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  Row,
  UncontrolledCollapse,
  UncontrolledDropdown,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input
} from 'reactstrap';

const AUTH_TOKEN = "auth_token";

function NavigationBar() {
  const [searchValue, setSearchValue] = useState("");
  const [redirect, setRedirect] = useState(false);

  function logout() {
    sessionStorage.removeItem(AUTH_TOKEN);
    setRedirect(true);
  }

  function checkUserLoggedIn() {
    if (sessionStorage.getItem(AUTH_TOKEN) != null) {
      return true;
    }
    return false;
  }

  return (
    <header className="header-global">
      {redirect ? <Redirect to='/' /> : null}
      <Navbar className="navbar-dark bg-danger" expand="lg">
        <Container>
          <NavbarBrand href="/">Logo</NavbarBrand>
          <button className="navbar-toggler" id="navbar-danger">
            <span className="navbar-toggler-icon" />
          </button>
          <UncontrolledCollapse navbar toggler="#navbar-danger">
            <div className="navbar-collapse-header">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <Link to="/">Logo</Link>
                </Col>
                <Col className="collapse-close" xs="6">
                  <button className="navbar-toggler" id="navbar-danger">
                    <span /><span />
                  </button>
                </Col>
              </Row>
            </div>
            <Nav className="navbar-nav-hover align-items-lg-center ml-lg-auto" navbar>
              <FormGroup className="mb-0">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-zoom-split-in" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Search" type="text" value={searchValue} onChange={(value) => setSearchValue(value.target.value)} />
                </InputGroup>
              </FormGroup>
              <UncontrolledDropdown nav style={checkUserLoggedIn() ? {display: 'initial'} : {display: 'none'}}>
                <DropdownToggle nav caret>
                  <i className="ni ni-collection d-lg-none mr-1" />
                  <span className="nav-link-inner--text">Jane Doe</span>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem to="/profile" tag={Link}>My Profile</DropdownItem>
                  <DropdownItem to="/create-recipe" tag={Link}>Create Recipe</DropdownItem>
                  <DropdownItem to="/liked" tag={Link}>Liked Recipes</DropdownItem>
                  <DropdownItem to="/my-recipes" tag={Link}>Your Recipes</DropdownItem>
                  <DropdownItem onClick={() => logout()}>Logout</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem to="/login" className="d-none d-lg-block ml-lg-4" >
                <Button className="btn-neutral btn-icon" color="default" href="/login" style={checkUserLoggedIn() ? {display: 'none'} : {display: 'initial'}}>
                  <span className="btn-inner--icon">
                    <i className="fa fa-cloud-download mr-2" />
                  </span>
                  <span className="nav-link-inner--text ml-1">
                    Login
                  </span>
                </Button>
              </NavItem>
            </Nav>
          </UncontrolledCollapse>
        </Container>
      </Navbar>

    </header>
  );
}

export default NavigationBar;