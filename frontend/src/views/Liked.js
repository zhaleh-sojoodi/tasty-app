import React from 'react';

import { Container } from 'reactstrap';

import NavigationBar from 'components/NavigationBar';
import Footer from 'components/Footer';
import RecipeList from 'components/RecipeList';

import { mostPopular } from "../dummydata";

function Liked() {

  let likedRecipes = mostPopular;

  return (
    <div>
      <NavigationBar />
        <main className="main">
        <Container className="mt-4 mb-4">
          <h2 className="display-3 mb-3">Liked Recipes</h2>
          <RecipeList props = {likedRecipes} />
          <hr />
        </Container>
        </main>
      <Footer />
    </div >
  );
}

export default Liked;
