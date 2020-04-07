import React, { useState, useEffect } from "react";

import {
  Container,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Row,
  Col,
} from "reactstrap";

import NavigationBar from "components/NavigationBar";
import Footer from "components/Footer";

const BASE_URL = "http://localhost:5000/api";
const USER_ID = "user_id";

function EditProfile(props) {

  const [formData, setFormData] = useState({
    name: "",
    biography: ""
  });

  const { name, biography } = formData;

  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

  const onSubmit = e => {
    e.preventDefault();

    // Check if name field is empty
    if(name === "" || !name) {
        alert("Name field cannot be empty.");
    } else {
        updateProfile(sessionStorage.getItem(USER_ID));
    }
  }

  const logout = _ => {
    sessionStorage.removeItem('auth_token');
    sessionStorage.removeItem('user_email');
    sessionStorage.removeItem('user_id');
    window.location.reload(true);
    alert("Something went wrong. Please sign in again.");
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
      if(!response.ok) {
        console.error("Unable to get user profile.");
        logout();
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
    const uri = BASE_URL + "/user/" + id;
    const settings = {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    }

    try {
      const response = await fetch(uri, settings);

      // Unable to update profile
      if(!response.ok) {
        console.error("Unable to update profile.");
        return;
      }

      // Successful fetch, redirect to user's profile
      alert("Your profile has been updated.");
      props.history.push("/profile/" + id);
    } catch(err) {
      console.error(err);
    }
  }

  useEffect(() => {
    // Fetch user data by user ID
    if(sessionStorage.getItem(USER_ID)) {
        fetchUserData(sessionStorage.getItem(USER_ID));
    } else {
        logout();
    }
  }, [])

  return (
    <div>
      <NavigationBar />
      <main className="main">
        <Container className="mt-4 mb-4" style={{ minHeight: "90vh" }}>
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

            <Button color="default" type="submit">Save Changes</Button>
          </Form>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default EditProfile;
