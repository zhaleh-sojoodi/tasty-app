import React from 'react';

import { Container } from 'reactstrap';

import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';

function Liked() {
  return (
    <div>
      <NavigationBar />
      <Container>
      <main className="main">
        RECIPES I LIKE
      </main>
      </Container>
      <Footer />
    </div >
  );
}

export default Liked;
