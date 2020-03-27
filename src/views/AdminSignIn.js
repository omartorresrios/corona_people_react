import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/SignIn.css';

class AdminSignIn extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      email: '',
      password: '',
      redirect: false
    };
    this.signin = this.signin.bind(this);
    this.onChange = this.onChange.bind(this);

  }

  signin() {
    console.log("data before: " + JSON.stringify(this.state));

    let isAllInputsFilled = this.state.email && this.state.password

    if (isAllInputsFilled) {
      axios.post('http://localhost:3000/users/signin', {
        email: this.state.email,
        password: this.state.password
      })
      .then((response) => {
        if (response.data) {
          sessionStorage.setItem('userData', JSON.stringify(response));
          this.setState({redirect: true});
          let is_admin = JSON.stringify(response.data.data.attributes.is_admin);
          console.log("user signed in: " + is_admin);
        } else {
          console.log("SignIn error");
        }
        let datauno = JSON.stringify(response.data.data.attributes.name)
        console.log("id: " + datauno)
        // console.log(JSON.stringify(response));
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {

    if (this.state.redirect) {
      return (<Redirect to={'/admin_dashboard'}/>)
    }

      if (sessionStorage.getItem("userData")) {
        return (<Redirect to={'/admin_dashboard'}/>)
      }
    return (
      <div className="sign-in__root container">
        <div className="row">
          <div className="six columns offset-by-three">
            <div className="SignIn__form-wrapper">
              <h2>User SignIn</h2>

              <input name="email" placeholder="email" onChange={this.onChange}/>
              <input name="password" placeholder="password" onChange={this.onChange}/>
              <button onClick={this.signin}>SignIn</button>
              <Link to="/signin">Are you an employee?</Link>
            </div>
          </div>
        </div>
      </div>
    );

  };
};

export default AdminSignIn;
