import React from 'react';

import {
  Container
} from 'reactstrap';

import NavigationBar from 'components/NavigationBar';
import Footer from 'components/Footer';
import RecipeDisplay from 'components/RecipeDisplay';

import { mostPopular, highestRated } from '../dummydata';

function Dashboard() {
  return (
    <div>
      <NavigationBar />
      <main className="main">
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
    </div >
  );
}

export default Dashboard;
