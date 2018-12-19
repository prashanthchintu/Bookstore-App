import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Link} from 'react-router-dom';
//import './Login.css';


class Login extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         username : '',
         password : '',
         message : ''
      }
    }

    onChange=(e)=>{
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
        
    }

    onSubmit=(e)=>{
        e.preventDefault();
        const {username,password} = this.state;
        axios.post('/api/auth/login',{username,password})
        .then((result)=>{
            localStorage.setItem('jwtToken',result.data.token)
            this.setState({message : ''})
            this.props.history.push('/')
        })
        .catch((error)=>{
            if(error.response.status === 401){
            this.setState({message : 'Login Failed . you are not authorized'})
                
            }
        })

    }
    render(){
        const {username,password,message} = this.state
        return(
            <div class="container">
            <form onSubmit={this.onSubmit}>
            {message !== '' && <div class="alert alert-warning alert-dismissible" role="alert">
            {message}
            </div>}
                <h2 class="form-signin-heading">Please Login In </h2>
                <label for="inputEmail" class="sr-only">Email Address</label>
                <input type="email" class="form-control" placeholder="Enter Email Address" name="username" value={username} onChange={this.onChange} required> </input>
                <label for="inputEmail" class="sr-only">Password</label>
                <input type="email" class="form-control" placeholder="Enter Password" name="password" value={password} onChange={this.onChange} required> </input>
                <button class="btn btn-lg btn-primary btn-block" type="submit">Login</button>
            </form>
            </div>
        );
    }
}


export default Login;