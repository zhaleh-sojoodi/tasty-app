import React, { useState, useEffect } from 'react';
import forceLogout from "../utils/forceLogout";

import { Container } from 'reactstrap';

import NavigationBar from 'components/NavigationBar';
import Footer from 'components/Footer';
import RecipeList from 'components/RecipeList';
import RecipeGrid from 'components/RecipeGrid';

const BASE_URL = "http://localhost:5000/api";
const USER_ID = 'user_id';

function Liked(props) {
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async(id) => {
    const settings = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }

    // Get user's liked recipes
    try {
      const uri = BASE_URL + "/recipe/user/all/list/like/recipes/" + id;

      const response = await fetch(uri, settings);

      // No recipes found
      if(response.status == 500) {
        console.log("Unable to get user's liked recipes.");
        return;
      }

      // Successful fetch, get user's liked recipes
      let data = await response.json();
      setRecipes(data.likedRecipes);
    } catch(err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if(sessionStorage.getItem(USER_ID)) {
      fetchRecipes(sessionStorage.getItem(USER_ID));
    } else {
      forceLogout();
    }
  }, [])

  // const [recipes, setRecipes] = useState([]);
  
  // useEffect(() => {
  //   const getMyLikes = async () => {
  //     const settings = {
  //       method: 'GET',
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json',
  //       }
  //     }
  //     fetch()
  //   }
  //   getMyLikes();
  // }, []);

        // let userId = sessionStorage.getItem(USER_ID);
      // const uri = BASE_URL + "user/" + userId;
      // try {
      //   var array = [];
      //   const response = await fetch(uri, settings);
      //   console.log(response.json());
      //   let data = await response.json();
      //   console.log(response.json());
      //   console.log(data.user.likes[0]);
      // } catch(e) {
      //   console.error(e);
      // }



  // setRecipes(data);
  // data.user.likes.forEach((like) => {
  //   console.log(like);
  //   setRecipes(recipes => recipes.concat(like));
  //   // setRecipes(recipes.concat(like));
  //   console.log(array);
  // })

  return (
    <>
    <NavigationBar {...props} />
    <main className="main">
    <Container className="mt-4 mb-4">
      <h2 className="display-3 mb-3">Liked Recipes</h2>
      {
      recipes.length ? <RecipeGrid props={recipes && recipes} />
      : <p className="lead">You haven't liked any recipes yet <span role="img" aria-label="Sad Emoji">😔</span></p>
      }
      
    </Container>
    </main>
    <Footer />
    </>
  );
}

export default Liked;
