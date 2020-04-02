import React from "react";

import {
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col
} from "reactstrap";

function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Row className="align-items-center justify-content-md-between">
          <Col md="6">
            <div className=" copyright">
              © {new Date().getFullYear()}{" "}
              <a href="/">Recipe App</a>.
            </div>
          </Col>
          <Col md="6">
            <Nav className="nav-footer justify-content-end">
              <NavItem>
                <NavLink href="https://github.com/nicole-ling/recipe-app/" target="_blank">GitHub</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/">About Us</NavLink>
              </NavItem>
            </Nav>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
