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

function Register(props) {

  useEffect(() => {
    // Redirect to dashboard if user is already logged in
    if(sessionStorage.getItem(AUTH_TOKEN)) {
      setRedirect(true);
    }
  }, [])

  const [redirect, setRedirect] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: ""
  });
  const { name, email, password, confirmpassword } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const onSubmit = e => {
    e.preventDefault();

    if(password !== confirmpassword) {
      console.log("Passwords do not match.");
    } else {
      const newUser = {
        name,
        email,
        password,
        confirmpassword
      }

      // Fetch
      fetch(BASE_URL + "/signup", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
      })
      .then(response => response.json())
      .then(json => {
        // Check if token was received
        if (json.token !== "" && json.token != null) {
          sessionStorage.setItem(AUTH_TOKEN, json["token"]);
          sessionStorage.setItem(USER_NAME, json.name);
          sessionStorage.setItem(USER_ID, json["userId"]);
          setRedirect(true);
        }
        if (json.message === "Signing up failed") {
          console.log(json.message);
        }
      })
      .catch(function (error) {
        console.log("Server error. Please try again later.");
      })
    }
  }

  function getPrevLocation() {
    if (props.location.state === undefined) {
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
      <main className="main">
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
                      <small>Create an account</small>
                    </div>
                    <Form role="form" onSubmit={e => onSubmit(e)}>
                      <ul>

                      </ul>

                      {/* Name */}
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-hat-3" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Username"
                            type="text"
                            name="name"
                            id="name"
                            value={name}
                            onChange={e => onChange(e)}
                          />
                        </InputGroup>
                      </FormGroup>

                      {/* Email */}
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-email-83" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Email"
                            type="email"
                            name="email"
                            id="email"
                            value={email}
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
                            placeholder="Password"
                            type="password"
                            name="password"
                            id="password"
                            autoComplete="off"
                            value={password}
                            onChange={e => onChange(e)}
                          />
                        </InputGroup>
                      </FormGroup>

                      {/* Confirm Password */}
                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-lock-circle-open" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Confirm Password"
                            type="password"
                            name="confirmpassword"
                            id="confirmpassword"
                            autoComplete="off"
                            value={confirmpassword}
                            onChange={e => onChange(e)}
                          />
                        </InputGroup>
                      </FormGroup>

                      {/* Submit */}
                      <div className="text-center">
                        <Button
                          type="submit"
                          className="my-4"
                          color="danger"
                        >
                          Register
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
                    <a className="text-white" href="/login">
                      <small>Already have an account?</small>
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

export default Register;