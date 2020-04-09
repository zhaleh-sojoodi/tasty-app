import React from 'react';
import { Link } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";

import { Container } from "reactstrap";

const PageNotFound = (props) => {
  return (
    <>
    <NavigationBar {...props} />
    <main className="main">
    <Container className="mt-5">
    <div className="px-4 d-flex flex-column justify-content-center">
      <h1 className="text-center mt-5">
        Sorry, this page doesn't exist <span role="img" aria-label="Ghost emoji">👻</span>
      </h1>
      <Link
        className="text-default text-center mt-3"
        to="/"
      >
        &larr; Back to Dashboard
      </Link>
    </div>
    </Container>
    </main>
    </>
  )
}

export default PageNotFound;