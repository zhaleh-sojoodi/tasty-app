import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import sliderImage1 from '../assets/img/slider/serving.jpg';
import sliderImage3 from '../assets/img/slider/cooking.jpg';
import sliderImage2 from '../assets/img/slider/kitchen.jpg';
import sliderImage4 from '../assets/img/slider/board.jpg';
import welcomeImage from '../assets/img/slider/welcome.jpg';

import {
  Container,
  Button,
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators
} from "reactstrap";

import NavigationBar from "components/NavigationBar";
import Footer from "components/Footer";
import RecipeGrid from "components/RecipeGrid";

const items = [
  {
    src: sliderImage1
  },
  {
    src: sliderImage2
  },
  {
    src: sliderImage3
  },
  {
    src: sliderImage4
  }
];

const BASE_URL = "http://localhost:5000/api/recipe/all";

function Dashboard(props) {
  const [mostPopular, setMostPopular] = useState();
  const [highestRated, setHighestRated] = useState();
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item.src} alt={item.altText} />
        <div className="onboarding">
          <h1 className="text-center mb-4">
            Find and share everyday cooking inspiration
          </h1>  
          <Button
            color="danger"
            type="button"
            tag={Link}
            to="/register"
          >
          Get Started
        </Button>
        </div>
      </CarouselItem>
    );
  });

  const settings = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }

  const getMostPopular = async() => {
    const uri = BASE_URL + "/popular";
    try {
      const response = await fetch(uri, settings);
      let data = await response.json();
      setMostPopular(data.recipes);
    } catch(e) {
      console.error(e);
    }
  }

  const getHighestRated = async() => {
    const uri = BASE_URL + "/top/rated";
    try {
      const response = await fetch(uri, settings);
      let data = await response.json();
      setHighestRated(data.recipes);
    } catch(e) {
      console.error(e);
    }
  }

  function isLoggedIn() {
    return sessionStorage.getItem("auth_token") ? true : false;
  }

  const onboarding =
  <section className="mb-5">
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
    >
      <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
      {slides}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
    </Carousel>
  </section>

  const welcome =
  <section className="welcome mb-5">
    <img
      className="welcome-img"
      src={welcomeImage}
      alt="kitchen counter"
    />
    <h1 className="text-center display-3">
      Welcome back!<br />
      What will you make today?
    </h1>
  </section>

  useEffect(() => {
    window.scrollTo(0, 0)
    getMostPopular();
    getHighestRated();
  }, []);

  return (
    <>
      <NavigationBar {...props} />
      <main className="main">
        {/* Display header */}
        { !isLoggedIn() ? onboarding : welcome }

        <Container className="mt-4 mb-5">
          {/* Display Create Recipe button if user is logged in */}
          { isLoggedIn() &&  
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
          }

          <h3 className="display-4 mt-3 mb-4"><i className="ni ni-favourite-28 text-danger mr-2" />Most Popular</h3>
            {mostPopular && <RecipeGrid props={mostPopular} /> }
          <hr />

          <h3 className="display-4 mt-3 mb-4"><i className="ni ni-satisfied text-danger mr-2" />Highest Rated</h3>
            {highestRated && <RecipeGrid props={highestRated} /> }
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default Dashboard;
