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
          <h4 className="display-4 mb-0">Liked Recipes</h4>
          <RecipeList props = {likedRecipes} />
          <hr />
        </Container>
        </main>
      <Footer />
    </div >
  );
}

export default Liked;
