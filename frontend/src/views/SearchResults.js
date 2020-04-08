import React, { useEffect, useState } from 'react';

import { Container } from 'reactstrap';

import NavigationBar from 'components/NavigationBar';
import Footer from 'components/Footer';
import RecipeGrid from 'components/RecipeGrid';

const BASE_URL = "http://localhost:5000/api/";

function SearchResults(props) {

  const [query, setQuery] = useState();
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async(query) => {
    const settings = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }

    // Get user data
    try {
      const uri = BASE_URL + "recipe/all/recipes/search/title/" + query;
      const response = await fetch(uri, settings);

      // Unable to fetch data, profile does not exist
      if(!response.ok) {
        console.error("Unable to get recipes.");
        return;
      }

      // Successful fetch, get user data
      let data = await response.json();
      setRecipes(data.recipes);
    } catch(err) {
      console.error(err);
    }
  }

  useEffect(() => {
    setQuery(props.location.state.query);
    fetchRecipes(encodeURIComponent(props.location.state.query));
  }, [])

  return (
    <>
    <NavigationBar {...props} />
    <main className="main">
    <Container className="mt-4 mb-4">
    <h2 className="display-3 mb-3">Search Results for '{query && query}'</h2>
      <RecipeGrid props={ recipes && recipes } />
    </Container>
    </main>
    <Footer />
    </>
  );
}

export default SearchResults;
