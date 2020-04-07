import React from 'react';

import { Container } from 'reactstrap';

import NavigationBar from 'components/NavigationBar';
import Footer from 'components/Footer';
import RecipeList from 'components/RecipeList';

import { mostPopular } from "../dummydata";

// const BASE_URL = "http://localhost:5000/api/";
// const USER_ID = 'user_id';

function Liked() {
  let likedRecipes = mostPopular;

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
