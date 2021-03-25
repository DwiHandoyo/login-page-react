
import './App.css';
import { Component } from 'react';
import {  Redirect, BrowserRouter, Route, Link} from "react-router-dom"

class register extends Component{
  constructor(props){
    super(props);
    this.state={
      email : "",
      password : "",
      style : {
        height: "670px",
        width: "450px"
      },
      firstName:"",
      lastName:"",
      phoneNumber:"",
      birthDay:"",
      gender:""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  submit= () =>{
    if(this.state.phoneNumber.substring(0, 3)!="+62"){
      alert("Invalid phone number, must start with (+62)");
      this.props.history.push("/register");
    }

    const data = { "firstName": this.state.firstName, "lastName" : this.state.lastName, "userEmail": this.state.email, "userPass": this.state.password, "phoneNumber":this.state.phoneNumber, "gender":this.state.gender,"birthDay":this.state.birthDay };
    var request = require('sync-request');
    var res = request('POST', 'http://127.0.0.1:5000/signUp', {
      json: data,
    });
    var response = JSON.parse(res.getBody('utf8'));
    
    if (response.message == "Success"){
      this.props.history.push("");
    }
    else{
      alert(response.message)
    }
  }
    
  onDateChange(event){
    console.log(event.target.value);
    this.state.gender = event.target.value;
    console.log(this.state);
  }

  handleChange(event) {
    // this.props.history.push("enter");
    const target = event.target;
    const value = target.value;
    const name = target.name;
    
    this.setState({
        [name]: value
    });
    console.log(this.state);
  }

  onDateChange(event){
    this.state.birthDay = event.target.value;
    console.log(this.state);
  }

  render(){
      return(
      <div id="card" style = {this.state.style}>
        <div id="card-content">
          <div className="App">
            <div id="card-title">
              <h2>REGISTER</h2>
              <div class="underline-title" style={{width: "150px"}}></div>
            </div>
            <form id="userForm" onSubmit = {this.submit} class="form">
              <label for="first-name" style={{paddingTop:"4px"}}>
                  &nbsp;First Name
                </label>
              <input type ="text" value = {this.state.firstName} onChange={this.handleChange} class="form-content"  name="firstName" autocomplete="on" required />
              <div class="form-border"></div>
              <label for="last-name" style={{paddingTop:"15px"}}>&nbsp;Last Name
                </label>
              <input value = {this.state.lastName} onChange={this.handleChange} class="form-content" type="lastName" name="lastName" required />
              <div class="form-border"></div>
              
              <label for="user-email" style={{paddingTop:"15px"}}>&nbsp;Email
                </label>
              <input value = {this.state.email} onChange={this.handleChange} class="form-content" type="email" name="email" required />
              <div class="form-border"></div>
              
              <label for="user-password" style={{paddingTop:"15px"}}>&nbsp;Password
                </label>
              <input value = {this.state.password} onChange={this.handleChange} class="form-content" type="password" name="password" required />
              <div class="form-border"></div>
              
              <label for="phone-number" style={{paddingTop:"15px"}}>&nbsp;Phone Number
                </label>
              <input value = {this.state.phoneNumber} onChange={this.handleChange} class="form-content" type="phoneNumber" name="phoneNumber" required />
              <div class="form-border"></div>
              <label style={{paddingTop:"30px"}} >&nbsp;Gender</label>
              <div style = {{paddingTop:"4px"}} id = "container">
                
                <input  style = {{float:"left"}} type="radio" id="male" name="gender" value="male" onChange={this.onDateChange.bind(this)}/>
                <label style = {{width:"15%", fontSize:"small",paddingTop:"2px"}}  for="male">&nbsp;Male</label><br/>
                <input  style = {{float:"left",paddingTop:"0px"}}  type="radio" id="female" name="gender" value="female" onChange={this.onDateChange.bind(this)}/>
                <label style = {{width:"25%", fontSize:"small",paddingTop:"2px"}} for="female">Female</label><br/>
              </div>
              <div style = {{paddingTop:"40px"}} id = "container">
                <label style = {{width:"30%",paddingTop:"2px"}} for="birthday">&nbsp;Date of birth&nbsp;</label>
                <input onChange={this.onDateChange.bind(this)} style = {{float:"left"}} type="date" id="birthDay" name="birthDay"/>
              </div>
              
              <input id="submit-btn" style = {{marginTop: "50px"}} type="submit" name="submit" value="Register" />

              
            </form>
          </div>
        </div>
      </div>
    );
  }
}

class enter extends Component{
  render(props){
    const query = new URLSearchParams(this.props.location.search);
    const email = query.get('email');
    const data = {"userEmail" : email}
    var request = require('sync-request');
    var res = request('POST', 'http://127.0.0.1:5000/getName', {
      json: data,
    });
    var response = JSON.parse(res.getBody('utf8'));
    let name = response.message;
    alert(name);
    return(
      <div>
         Halo {name}
      </div>
    );
  }
}

class main extends Component{
  constructor(props){
    super(props);
    this.state={
      email : "",
      password : ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  submit= () =>{
    const data = { "userEmail": this.state.email, "userPass": this.state.password };
    var request = require('sync-request');
    var res = request('POST', 'http://127.0.0.1:5000/logIn', {
      json: data,
    });
    var response = JSON.parse(res.getBody('utf8'));
    let params = "?email="+this.state.email
    if (response.message == "Success"){
      this.props.history.push({
        pathname: '/enter',
        search: params,
        state: { detail: response.data }
      });
    }
    else{
      alert(response.message)
    }
  }
    

  handleChange(event) {
    // this.props.history.push("enter");
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
        [name]: value
    });
    console.log(this.state);
  }

  
  render(){
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return(
    <div id="card">
      <div id="card-content">
        <div className="App">
          <div id="card-title">
            <h2>LOGIN</h2>
            <div class="underline-title"></div>
          </div>
          <form id="userForm" onSubmit = {this.submit} class="form">
            <label for="user-email" style={{paddingTop:"13px"}}>
                &nbsp;User Email
              </label>
            <input type ="text" value = {this.state.email} onChange={this.handleChange} class="form-content"  name="email" autocomplete="on" required />
            <div class="form-border"></div>
            <label for="user-password" style={{paddingTop:"22px"}}>&nbsp;Password
              </label>
            <input value = {this.state.password} onChange={this.handleChange} class="form-content" type="password" name="password" required />
            <div class="form-border"></div>
            <input id="submit-btn" type="submit" name="submit" value="LOGIN" />
            <a href="#" id="signup"></a>
          </form>
          <a href="register">
            or Register
          </a>
        </div>
      </div>
    </div>
    )
  }
}

class App extends Component{

  render(){
    return (
  <BrowserRouter>
    <Route path = "/" exact component = {main}/>
    <Route path = "/register" exact component = {register}/>
    <Route path = "/enter" exact component = {enter}/>
  </BrowserRouter>
    );
  }
}

export default App;
