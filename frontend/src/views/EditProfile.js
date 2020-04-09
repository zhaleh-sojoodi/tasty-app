import React, { useState, useEffect } from "react";
import forceLogout from "../utils/forceLogout";

import {
  Container,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from "reactstrap";

import NavigationBar from "components/NavigationBar";
import Footer from "components/Footer";

const BASE_URL = "http://localhost:5000/api";

function EditProfile(props) {

  const [formData, setFormData] = useState({
    name: "",
    biography: "",
    profilepicture: ""
  });

  const { name, biography } = formData;

  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

  const onSubmit = e => {
    e.preventDefault();

    // Check if name field is empty
    if(name === "" || !name) {
      alert("Name field cannot be empty.");
    } else {
      updateProfile(sessionStorage.getItem("user_id"));
    }
  }

  const fetchUserData = async(id) => {
    const uri = BASE_URL + "/user/" + id;
    const settings = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }

    try {
      const response = await fetch(uri, settings);

      // Unable to fetch data, profile does not exist
      if(!response.ok ||
        response.status === 500 ||
        response.status === 422
      ) {
        console.log("Unable to get user profile.");
        forceLogout();
        return;
      }

      // Successful fetch, get user data
      let data = await response.json();
      setFormData({
        name: data.user.name,
        biography: data.user.biography
      })
    } catch(err) {
      console.error(err);
    }
  }

  const updateProfile = async(id) => {
    let token = sessionStorage.getItem("auth_token");
    const uri = BASE_URL + "/user";

    const formData = new FormData();
    const fileField = document.querySelector('input[type="file"]');
    formData.append("name", name);
    formData.append("biography", biography);

    if(fileField) {
      formData.append("image", fileField.files[0]);
    }

    const settings = {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    }

    try {
      const response = await fetch(uri, settings);

      // Unable to update profile
      if(response.status === 401) {
        forceLogout();
        return;
      }

      // Successful fetch, redirect to user's profile
      props.history.push("/profile/" + id);
      window.location.reload();
    } catch(err) {
      console.error(err);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    // Fetch user data by user ID
    if(sessionStorage.getItem("user_id")) {
      fetchUserData(sessionStorage.getItem("user_id"));
    } else {
      forceLogout();
    }
  }, [])

  return (
    <>
      <NavigationBar {...props} />
      <main className="main">
        <Container className="mt-4 mb-4">
          <h1 className="display-3 mb-3">Edit Profile</h1>

          <Form onSubmit={e => onSubmit(e)}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="name"
                name="name"
                id="name"
                value={ name && name }
                placeholder="Your name"
                onChange={e => onChange(e)}
              />
            </FormGroup>

            <FormGroup>
              <Label for="biography">Biography</Label>
              <Input
                type="textarea"
                name="biography"
                id="biography"
                rows="3"
                value={ biography && biography }
                placeholder=""
                onChange={e => onChange(e)}
              />
            </FormGroup>

            <FormGroup>
              <Label for="recipeimage">Profile Picture</Label>
              <Input
                type="file"
                name="profilepicture"
                id="profilepicture"
              />
              <FormText color="muted">
                For best results, upload an image that is at least 100x100 pixels.
              </FormText>
            </FormGroup>

            <Button color="default" type="submit">Save Changes</Button>
          </Form>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default EditProfile;
