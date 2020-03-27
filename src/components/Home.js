import React, { Component } from 'react';
import Header from './Header';
import axios from 'axios';
import CitizenItem from './CitizenItem';

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      citizens: []
    };
  }

  componentDidMount() {
    // let data = JSON.parse(sessionStorage.getItem("userData"));
    // let userToken = JSON.stringify(data.data.data.attributes.authentication_token);
    // console.log("userToken: " + userToken);
    this.getAllCitizens();
  }

  getAllCitizens() {

    axios.get('http://localhost:3000/all_citizens').then(response => {
      console.log("getting all citizens: " + JSON.stringify(response.data));
      this.setState({citizens: response.data})
    })
    .catch((error) => {
      console.log('Cant get current user data because: ' + error);
    });
  }

  render() {
    return (
      <div className="Home">
        <div>Hola gente, este es el Home</div>
        <CitizenItem data = {this.state.citizens}/>
      </div>
    );
  }
}

export default Home;
