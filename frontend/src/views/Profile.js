import React from "react";
import "assets/css/custom.css";

import { Card, Container, Row, Col } from "reactstrap";

import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import RecipeDisplay from "../components/RecipeDisplay";

import { mostPopular, user } from "../dummydata";

function Profile() {

  let recipes = mostPopular;

  return (
    <div>
      <NavigationBar />
      <main className="main profile-page">
        {/* Background */}
        <section className="section-profile-cover section-shaped my-0">
          {/* Circles background */}
          <div className="shape shape-style-1 shape-default alpha-4 bg-gradient-red">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          {/* SVG separator */}
          <div className="separator separator-bottom separator-skew">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon className="fill-white" points="2560 0 2560 100 0 100" />
            </svg>
          </div>
        </section>

        {/* Profile */}
        <section className="section">
          <Container>
            <Card className="card-profile shadow mt--300 pb-5">
              <div className="px-4">
                <Row className="justify-content-center">
                  {/* Profile Image */}
                  <Col className="order-lg-2 mb-5" lg="3">
                    <div className="card-profile-image mb-5">
                      <a href="/profile" onClick={(e) => e.preventDefault()}>
                        <img
                          alt={user.name}
                          style={{
                            width: "150px",
                            height: "150px",
                            objectFit: "cover",
                            objectPosition: "35% 100%",
                          }}
                          className="rounded-circle"
                          src={user.image}
                        />
                      </a>
                    </div>
                  </Col>
                </Row>

                {/* User Details */}
                <div className="text-center mt-5">
                  <h3>{user.name}</h3>
                  <div className="h6 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    Vancouver, BC
                  </div>
                </div>

                {/* Description */}
                <div className="mt-5 py-5 border-top text-center">
                  <Row className="justify-content-center">
                    <Col lg="9">
                      <p>{user.bio}</p>
                    </Col>
                  </Row>
                </div>
                <hr />

                {/* User Recipes */}
                <h3>Recipes Created</h3>
                <RecipeDisplay props={recipes} />
                <hr />

                {/* User Liked Recipes */}
                <h3>Liked Recipes</h3>
                <RecipeDisplay props={recipes} />
              </div>
            </Card>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Profile;
