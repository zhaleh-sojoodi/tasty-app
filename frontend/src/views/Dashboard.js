import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import { Container, Button } from "reactstrap";

import NavigationBar from "components/NavigationBar";
import Footer from "components/Footer";
import RecipeDisplay from "components/RecipeDisplay";

const BASE_URL = "http://localhost:5000/api/recipe/all";

function Dashboard() {
  const [mostPopular, setMostPopular] = useState();
  const [highestRated, setHighestRated] = useState();

  const settings = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }

  useEffect(() => {
    const getMostPopular = async() => {
      const uri = BASE_URL + "/popular";
      try {
        const response = await fetch(uri, settings);
        let data = await response.json();
        setMostPopular(data.recipes);
      } catch(e) {
        console.error(e);
      }
    }
    getMostPopular();
    const getHighestRated = async() => {
      const uri = BASE_URL + "/top/rated";
      try {
        const response = await fetch(uri, settings);
        let data = await response.json();
        setHighestRated(data.recipes);
      } catch(e) {
        console.error(e);
      }
    }
    getHighestRated();
  }, []);

  return (
    <div>
      <NavigationBar />
      <main className="main">
        <Container className="mt-4 mb-5">
          <section className="d-flex justify-content-end">
            <Button
              className="mb-4"
              color="default"
              type="button"
              tag={Link}
              to="/create-recipe"
            >
              Create New
            </Button>
          </section>

          <h3 className="display-4 mt-3 mb-4"><i className="ni ni-favourite-28 text-danger mr-2" />Most Popular</h3>
            {mostPopular && <RecipeDisplay props={mostPopular} /> }
          <hr />

          <h3 className="display-4 mt-3 mb-4"><i className="ni ni-satisfied text-danger mr-2" />Highest Rated</h3>
            {highestRated && <RecipeDisplay props={highestRated} /> }
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default Dashboard;
