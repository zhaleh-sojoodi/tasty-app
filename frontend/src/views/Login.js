import React from "react";
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

function Login() {
  return (
    <>
      <NavigationBar />
      <main className="main">
        <section className="section section-shaped section-lg" style={{minHeight:'100vh'}}>
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
                          <Input placeholder="Email" type="email" />
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
                          />
                        </InputGroup>
                      </FormGroup>

                      {/* Submit Form */}
                      <div className="text-center">
                        <Button className="my-4" color="danger" type="button">
                          Sign in
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
