import React from 'react';

import { Container } from 'reactstrap';

import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';

function Profile() {
  return (
    <div>
      <NavigationBar />
      <Container>
      <main className="main">
        MY PROFILE
      </main>
      </Container>
      <Footer />
    </div >
  );
}

export default Profile;
