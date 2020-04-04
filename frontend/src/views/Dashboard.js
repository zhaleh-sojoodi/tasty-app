import React from "react";
import { Link } from 'react-router-dom';

import { Container, Button } from "reactstrap";

import NavigationBar from "components/NavigationBar";
import Footer from "components/Footer";
import RecipeDisplay from "components/RecipeDisplay";

import { mostPopular, highestRated, user } from "../dummydata";

function Dashboard() {
  return (
    <div>
      <NavigationBar />
      <main className="main">
        <Container className="mt-4 mb-4 d-flex justify-content-between">
        <h1 className="display-3">Welcome back, {user.name}!</h1>
          <Button
            className="mb-4"
            size="lg"
            color="default"
            type="button"
            tag={Link}
            to="/create-recipe"
          >
            Create Recipe
          </Button>
        </Container>

        <Container className="mt-4 mb-4">
          <h4 className="display-4 mb-0">Most Popular</h4>
          <RecipeDisplay props={mostPopular} />
          <hr />
        </Container>

        <Container className="mt-4 mb-4">
          <h4 className="display-4 mb-0">Highest Rated</h4>
          <RecipeDisplay props={highestRated} />
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default Dashboard;
