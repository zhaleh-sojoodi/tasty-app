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

function Login(props) {

  useEffect(() => {
    // Redirect to dashboard if user is already logged in
    if(sessionStorage.getItem("auth_token")) {
      setRedirect(true);
    }
  }, [])

  const [redirect, setRedirect] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const { email, password } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const uri = BASE_URL + "/login";
      const response = await fetch(uri, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
      });

      // Unable to login user
      if(!response.ok ||
      response.status === 401 ||
      response.status === 500
      ) {
        console.log("Unable to sign in.");
        return;
      }

      // Successful fetch, set session variables
      let data = await response.json();
      
      if(data.token !== "" && data.token) {
        sessionStorage.setItem("auth_token", data.token);
        sessionStorage.setItem("user_name", data.name);
        sessionStorage.setItem("user_id", data.userId);
        setRedirect(true);
      }
    } catch(e) {
      console.error(e);
    }
  }

  function getPrevLocation() {
    if (props.location.state === undefined) {
      return '/';
    } else if (props.location.state.prevLocation === "/profile/:id") {
      return '/';
    }
    return props.location.state.prevLocation
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  
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
      <main className="main main-login">
        <section className="section-auth section section-shaped section-lg">
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
                    <Form role="form" onSubmit={e => onSubmit(e)}>
                      {/* Email */}
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-email-83" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={email}
                            placeholder="Email"
                            onChange={e => onChange(e)}
                          />
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
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            placeholder="Password"
                            onChange={e => onChange(e)}
                            autoComplete="off"
                          />
                        </InputGroup>
                      </FormGroup>
                      {/* Submit Form */}
                      <div className="text-center">
                        <Button
                          type="submit"
                          color="danger"
                          className="my-4"
                          // onClick={() => login()}
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
