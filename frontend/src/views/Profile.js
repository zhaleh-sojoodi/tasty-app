import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import "assets/css/custom.css";

import { Card, Container, Row, Col } from "reactstrap";

import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import RecipeDisplay from "../components/RecipeDisplay";

import { mostPopular, user } from "../dummydata";
let recipes = mostPopular;

const BASE_URL = "http://localhost:5000/api";
const AUTH_TOKEN = "auth_token";
const USER_ID = "user_id";

function Profile(props) {

  const [userData, setUserData] = useState();
  const [profileExists, setProfileExists] = useState(true);
  const [profileBelongsToUser, setProfileBelongsToUser] = useState(false);

  const fetchUserData = async(id) => {
    const uri = BASE_URL + "/user/" + id;
    const settings = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }

    try {
      const response = await fetch(uri, settings);

      // Unable to fetch data, profile does not exist
      if(!response.ok) {
        console.error("Unable to get user profile.");
        setProfileExists(false);
        return;
      }

      // Successful fetch, get user data
      let data = await response.json();
      setUserData(data.user);
      console.log(data.user);
    } catch(err) {
      console.error(err);
      setProfileExists(false);
    }
  }

  useEffect(() => {
    // Check if ID params exist in URL
    if(props.match.params.id) {

      // Fetch user data with given ID
      fetchUserData(props.match.params.id);

      // Check if profile fetched belongs to current user
      if(props.match.params.id === sessionStorage.getItem(USER_ID)) {
        setProfileBelongsToUser(true);
      }
    } else {
      setProfileExists(false);
    }
  }, [])

  return (
    <div>
      <NavigationBar />
      <main className="main profile-page">

        {/* Background */}
        <section className="section-profile-cover section-shaped my-0">

          {/* Circles */}
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

              {/* Profile Exists */}
              { profileExists ?
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
                  <h2>{ profileExists ? "" : "This profile doesn't exist :("  }</h2>
                  <h2 className="display-3" >{ userData && userData.name }</h2>
                </div>

                {/* Description */}
                <div className="text-center py-2">
                  <Row className="justify-content-center">
                    <Col lg="9">
                      <p>{ userData && userData.biography }</p>
                      { profileBelongsToUser && <Link to="/edit-profile">Edit Profile</Link> }
                    </Col>
                  </Row>
                </div>
                <hr className="my-4" />

                {/* User Recipes */}
                <h3 className="my-3 display-4">Recipes Created</h3>
                <RecipeDisplay props={recipes} />
                <hr className="my-4" />

                {/* User Liked Recipes */}
                <h3 className="my-3 display-4">Liked Recipes</h3>
                <RecipeDisplay props={recipes} />
              </div>

              // Profile Doesn't Exist
              :
              <div className="px-4 d-flex flex-column justify-content-center align-items-center" style={{minHeight: "50vh"}}>
                <h1 className="display-3 mt-5 text-center">
                  This profile does not exist.
                </h1>
                <Link className="text-default" to="/">&larr; Back to Dashboard</Link>
              </div>
              }

            </Card>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Profile;
