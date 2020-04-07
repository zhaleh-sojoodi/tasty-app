import React, { useState } from "react";
import axios from "axios";
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

const AUTH_TOKEN = "auth_token";

function Register(props) {

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

  const onSubmit = async e => {
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

      try {
        const config = {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }

        const body = JSON.stringify(newUser);
        const res = await axios.post('http://localhost:5000/api/user/signup', body, config);
        
        console.log("Successful registration!");
        console.log(res.data);
      } catch(error) {
        console.error(error.response);
      }
    }
  }

  return (
    <>
      {/* Redirect to dashboard if user is already logged in. */}
      { sessionStorage.getItem(AUTH_TOKEN) != null && props.history.push("/") }

      <NavigationBar />
      <main className="main">
        <section className="section section-shaped section-lg" style={{minHeight:'95vh'}}>
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
