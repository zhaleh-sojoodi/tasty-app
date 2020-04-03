import React from 'react';

import { Container } from 'reactstrap';

import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';

function MyRecipes() {
  return (
    <div>
      <NavigationBar />
      <Container>
        <main className="main">
          MY RECIPES
        </main>
      </Container>
      <Footer />
    </div >
  );
}

export default MyRecipes;
