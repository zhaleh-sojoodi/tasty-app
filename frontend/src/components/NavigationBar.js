import React, { useState, useEffect } from 'react';
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
  Input,
  Form
} from 'reactstrap';

const APP_NAME = "Tasty";
const AUTH_TOKEN = "auth_token";
const USER_NAME = "user_name";
const USER_ID = "user_id";

function NavigationBar(props) {
  const [searchValue, setSearchValue] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [username, setUsername] = useState();

  function logout() {
    sessionStorage.removeItem(AUTH_TOKEN);
    sessionStorage.removeItem(USER_NAME);
    sessionStorage.removeItem("user_id");
    setRedirect(true);
  }

  function checkUserLoggedIn() {
    if (sessionStorage.getItem(AUTH_TOKEN) != null) {
      return true;
    }
    return false;
  }

  const onSubmit = e => {
    e.preventDefault();

    // Process search if search is not empty
    if(searchValue !== "") {
      // Hard refresh if user is already on Search Results page
      let currentURL = window.location.href;
      if(currentURL.slice(currentURL.length - 7) === "/search") {
        window.location.reload();
      }

      // Redirect to search results page with query
      props.history.push({
        pathname: '/search',
        state: {query: searchValue}
      })
    }
  }

  useEffect(() => {
    if(sessionStorage.getItem(USER_NAME)) {
      setUsername(sessionStorage.getItem(USER_NAME));
    }
  }, [])

  return (
    <header className="header-global">
      {redirect ? <Redirect to='/' /> : null}
      <Navbar className="navbar-dark bg-danger" expand="lg">
        <Container>
          <NavbarBrand className="tasty" href="/">{APP_NAME}</NavbarBrand>
          <button className="navbar-toggler" id="navbar-danger">
            <span className="navbar-toggler-icon" />
          </button>
          <UncontrolledCollapse navbar toggler="#navbar-danger">
            <div className="navbar-collapse-header">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <Link className="tasty" to="/">{APP_NAME}</Link>
                </Col>
                <Col className="collapse-close" xs="6">
                  <button className="navbar-toggler" id="navbar-danger">
                    <span /><span />
                  </button>
                </Col>
              </Row>
            </div>
            <Nav className="navbar-nav-hover align-items-lg-center ml-lg-auto" navbar>

              {/* Search Bar */}
              <Form onSubmit={e => onSubmit(e)}>
              <FormGroup className="mb-0">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-zoom-split-in" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Search"
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              </Form>

              {/* Profile Menu */}
              <UncontrolledDropdown nav style={checkUserLoggedIn() ? {display: 'initial'} : {display: 'none'}}>
                <DropdownToggle nav caret>
                  <i className="ni ni-collection d-lg-none mr-1" />
                  <span className="nav-link-inner--text">{ username && username }</span>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem to="/myprofile" tag={Link}>My Profile</DropdownItem>
                  <DropdownItem to="/create-recipe" tag={Link}>Create Recipe</DropdownItem>
                  <DropdownItem to="/liked" tag={Link}>Liked Recipes</DropdownItem>
                  <DropdownItem to="/my-recipes" tag={Link}>My Recipes</DropdownItem>
                  <DropdownItem onClick={() => logout()}>Logout</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

              {/* Login Button */}
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