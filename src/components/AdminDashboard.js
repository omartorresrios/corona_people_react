import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

import axios from 'axios';

class AdminDashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      image: '',
      name: '',
      dni: '',
      district: '',
      infraction: '',
      is_admin: '',
      redirect: false
    };
    this.registerCitizen = this.registerCitizen.bind(this);
    this.logout = this.logout.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.checkIfUserIsAdmin();
  }

  checkIfUserIsAdmin() {
    let data = JSON.parse(sessionStorage.getItem("userData"));
    let user = sessionStorage.getItem("userData");
    let userToken = JSON.stringify(data.data.data.attributes.authentication_token);
    const userTokenConcatenated = 'Token token='.concat(userToken);

    axios.get('http://localhost:3000/get_current_user', { headers: { Authorization: userTokenConcatenated } }).then(response => {
        let is_admin = JSON.stringify(response.data.is_admin)
        if (is_admin == "true") {
          this.setState({is_admin: "true"});
        } else {
          this.setState({is_admin: "false"});
        }
      })
      .catch((error) => {
        console.log('Cant get current user data because: ' + error);
      });
  }

  registerCitizen(e) {
    e.preventDefault();

    const fd = new FormData();
    fd.append('image', this.state.image)

    for (var key of fd.entries()) {
        console.log('veamos: ' + key[0] + ', ' + key[1]);
    }


    let isAllInputsFilled = this.state.name && this.state.dni && this.state.district && this.state.infraction

    if (isAllInputsFilled) {
      let data = JSON.parse(sessionStorage.getItem("userData"));
      let userToken = JSON.stringify(data.data.data.attributes.authentication_token);
      const userTokenConcatenated = 'Token token='.concat(userToken);

      let json = {
          avatar: this.state.image,
          name: this.state.name,
          dni: this.state.dni,
          district: this.state.district,
          infraction: this.state.infraction
      }

      console.log("json sended: " + JSON.stringify(json));

      axios.post("http://localhost:3000/admin_register_user", {
        avatar: this.state.image,
        name: this.state.name,
        dni: this.state.dni,
        district: this.state.district,
        infraction: this.state.infraction,
      }, { headers: { Authorization: userTokenConcatenated } }).then(response => {
        console.log("Citizen created!: " + JSON.stringify(response.data));
        this.setState({ name: '', dni: '', district: '', infraction: ''})
        let data1 = JSON.parse(sessionStorage.getItem("userData"));
        let name = JSON.stringify(data.data.data.attributes.name);
        console.log("checking the current user: " + name);
        // console.log("this.state.image: " + this.state.image);
      })
      .catch((error) => {
        console.log('Cant save the review in the server because: ' + error);
      });
    } else {
      console.log("debes llenar todos los campos!");
    }
  }

  logout() {
    console.log("loging out");
    sessionStorage.setItem("userData", "");
    console.log("sessionStorage: " + sessionStorage.getItem("userData"));
    sessionStorage.clear();
    this.setState({redirect: true});
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
    // console.log("e: " + e.target.value);
    let files = e.target.files;
    // if (e.target.name == "image") {
      // let image = e.target.value
      // this.readFile(image)
    console.log("files: " + JSON.stringify(files));





    if (files && files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(files[0]);
      console.log("inside!: " + e.target.result);


      var output = document.getElementById('output');
      output.src = URL.createObjectURL(e.target.files[0]);


      reader.onload=(e)=> {
        URL.revokeObjectURL(output.src)
      //   // console.warn("image data: ", e.target.result);
      //
      //   // const formData = {avatar: e.target.result}
      //   // console.log("formData: " + JSON.stringify(formData));
        this.setState({image: e.target.result})
      //   console.log("the final fucking image: " + this.state.image);
        }
      // }
    }


  }

  redirectToSignIn() {
    return (<Redirect to={'/admin/signin'}/>)
  }

  showLoadingData() {
    return (
      <div>
        cargando datos
      </div>
    );
  }

  showDashboardView() {
    return (
      <div>
        <h2>Registra a un ciudadano</h2>
        <div onSubmit={this.registerCitizen}>
            <input type="file" onChange={this.onChange} />
            <img id="output"/>
            <input name="name" value={this.state.name} placeholder="name" onChange={this.onChange}/>
            <input name="dni" value={this.state.dni} placeholder="dni" onChange={this.onChange}/>
            <input name="district" value={this.state.district} placeholder="district" onChange={this.onChange}/>
            <input name="infraction" value={this.state.infraction} placeholder="infraction" onChange={this.onChange}/>
            // <button onClick={this.registerCitizen}>Registrar persona</button>
            <button type="submit">Submit</button>
        </div>
        <div>
          <button type='button' onClick={this.logout}>Logout</button>
        </div>
      </div>

    );
  }

  redirectToHome() {
    return (<Redirect to={'/'}/>)
  }

  render() {

    if (this.state.redirect) {
      return this.redirectToSignIn()
    }

    if (this.state.is_admin == "") {
      return this.showLoadingData()
    } else if (this.state.is_admin == "true") {
      return this.showDashboardView()
    } else {
      return this.redirectToHome()
    }
  }
}

export default AdminDashboard;
