import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";

import { Container } from "reactstrap";

const PageNotFound = (props) => {
  
  useEffect(() => {window.scrollTo(0, 0)},[])

  return (
    <>
    <NavigationBar {...props} />
    <main className="main">
    <Container className="mt-5">
    <div className="px-4 d-flex flex-column justify-content-center">
      <h4 className="display-4 text-center mt-5">
        Tasty is a web application that allows users to share and discover new recipes.
      </h4>
      <p className="lead text-center">
        We built it using the MERN stack (MongoDB, Express, React and Node.js).
      </p>
      <p className="text-center">
        Created by <a className="text-danger" href="http://github.com/nicole-ling">Nicole Ling</a>, <a className="text-danger" href="http://github.com/jalehs">Zhaleh Sojoodi</a>, <a className="text-danger" href="http://github.com/anthonyyso">Anthony So</a> and <a className="text-danger" href="http://github.com/vibharana">Vibha Rana</a>.
      </p>
    </div>
    </Container>
    </main>
    <Footer />
    </>
  )
}

export default PageNotFound;