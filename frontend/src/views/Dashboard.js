import React from "react";
import { Link } from 'react-router-dom';

import { Container, Button } from "reactstrap";

import NavigationBar from "components/NavigationBar";
import Footer from "components/Footer";
import RecipeDisplay from "components/RecipeDisplay";

import { mostPopular, highestRated } from "../dummydata";

function Dashboard() {
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
          <RecipeDisplay props={mostPopular} />
          <hr />

          <h3 className="display-4 mt-3 mb-4"><i className="ni ni-satisfied text-danger mr-2" />Highest Rated</h3>
          <RecipeDisplay props={highestRated} />
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default Dashboard;
