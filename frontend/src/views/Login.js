import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom';
import "assets/css/custom.css";

import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";

const BASE_URL = "http://localhost:5000/api/user";
const AUTH_TOKEN = "auth_token";
const USER_NAME = "user_name";
const USER_ID = "user_id";

function Login(props) {

  useEffect(() => {
    // Redirect to dashboard if user is already logged in
    if(sessionStorage.getItem(AUTH_TOKEN)) {
      setRedirect(true);
    }
  }, [])

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [message, setMessage] = useState("");
  const [redirect, setRedirect] = useState(false);

  function login() {
    fetch(BASE_URL + "/login", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      // Response received.
      .then(response => response.json())
      // Data retrieved.
      .then(json => {
        if (json.token !== "" && json.token != null) {
          sessionStorage.setItem(AUTH_TOKEN, json["token"]);
          sessionStorage.setItem(USER_NAME, json.name);
          sessionStorage.setItem(USER_ID, json["userId"]);
          setRedirect(true);
        }
        if (json.message === "Invalid Credentials") {
          //setMessage(json.message);
        }
      })
      // Data not retrieved.
      .catch(function (error) {
        console.log("caught error");
      })
  }

  function getPrevLocation() {
    if (props.location.state === undefined) {
      return '/';
    }
    return props.location.state.prevLocation
  }
  
  return (
    <>
      {/* Redirect to page where user was before logging in. */}
      {redirect ? <Redirect to={{
        pathname: getPrevLocation(),
        state: {
          loggedIn: true
        }
      }} /> : null}

      <NavigationBar {...props} />
      <main className="main">
        <section className="section section-shaped section-lg" style={{ minHeight: '100vh' }}>
          <div className="shape shape-style-1 bg-gradient-default bg-gradient-red">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <Container className="pt-lg-7">
            <Row className="justify-content-center">
              <Col lg="5">
                <Card className="bg-secondary shadow border-0">
                  <CardBody className="px-lg-5 py-lg-5">
                    <div className="text-center text-muted mb-4">
                      <small>Welcome back!</small>
                    </div>
                    <Form role="form">
                      {/* Email */}
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-email-83" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input placeholder="Email" type="email" value={email} onChange={e => { setEmail(e.target.value) }} />
                        </InputGroup>
                      </FormGroup>
                      {/* Password */}
                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-lock-circle-open" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Password"
                            type="password"
                            autoComplete="off"
                            onChange={e => { setPassword(e.target.value) }}
                          />
                        </InputGroup>
                      </FormGroup>
                      {/* Submit Form */}
                      <div className="text-center">
                        <Button
                          className="my-4"
                          color="danger"
                          type="button"
                          onClick={() => login()}
                        >
                          Sign In
                        </Button>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
                <Row className="mt-3">
                  <Col xs="6">
                    <a className="text-white" href="/">
                      <small>&larr; Back to Homepage</small>
                    </a>
                  </Col>
                  <Col className="text-right" xs="6">
                    <a className="text-white" href="/register">
                      <small>Create new account</small>
                    </a>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Login;
