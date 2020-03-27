import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
// import '../styles/SignIn.css';

class AdminSignUp extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      email: '',
      password: '',
      name: '',
      redirect: false
    };
    this.signup = this.signup.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  signup() {

    let isAllInputsFilled = this.state.name && this.state.email

    if (isAllInputsFilled) {
      axios.post('http://localhost:3000/users/signup', {
        email: this.state.email,
        password: this.state.password,
        name: this.state.name
      })
      .then((response) => {
        if (response.data) {
          sessionStorage.setItem('userData', JSON.stringify(response));
          this.setState({redirect: true});
        //   this.showSuccessMessageAfterSignUp();
          console.log("SignUp successfully");
        } else {
          console.log("SignUp error");
        }
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }

  renderDefaultView = () => {
      return <div>
        <div>Debes esperar que te hagan Administrador para poder agregar personas!</div>
      </div>
    }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  showSuccessMessageAfterSignUp() {
    return (
      <div>
          <h2>Debes esperar que te hagan Administrador para poder agregar personas!</h2>
      </div>
    );
  }

  render() {

    if (this.state.redirect) {
      // return (<Redirect to={'/admin_dashboard'}/>)
      return (
        <div>
            <h2>Debes esperar que te hagan Administrador para poder agregar personas!</h2>
        </div>
      );
    }

    // if (sessionStorage.getItem("adminData")) {
    //   return (<Redirect to={'/admin_dashboard'}/>)
    // }
    return (
      <div className="sign-in__root container">
        <div className="row">
          <div className="six columns offset-by-three">
            <div className="SignIn__form-wrapper">
              <h2>User SignUp</h2>
              <input type="text" name="name" placeholder="name" onChange={this.onChange}/>
              <input type="text" name="email" placeholder="email" onChange={this.onChange}/>
              <input type="text" name="password" placeholder="password" onChange={this.onChange}/>
              <button onClick={this.signup}>SignUp</button>
              <Link to="/signin">Are you an employee?</Link>
            </div>
          </div>
        </div>
      </div>
    );

  };
};

export default AdminSignUp;
