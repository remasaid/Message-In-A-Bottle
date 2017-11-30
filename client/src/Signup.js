import React, { Component } from 'react';
import axios from 'axios'
import { Card, Input } from 'react-materialize';
import Notifications, { notify } from 'react-notify-toast';
import config from './config.js'

class Signup extends Component {
    submitHandler = (event) => {
        event.preventDefault();
        let userName = document.querySelector('input[name=userName]').value
        let password = document.querySelector('input[name=password]').value
        let passwordCheck = document.querySelector('input[name=passwordCheck]').value
        
        let location = document.querySelector('input[name=location]').value;
        let myColor = { background: '#ff80ab', text: "#FFFFFF" };
        if(userName.length < 5) {
            notify.show('You must choose a username of at least 6 characters', "custom", 5000, myColor)
        
        }
        else if (password !== passwordCheck) {

            notify.show('The passwords you entered do not match', "custom", 5000, myColor)
          
        }
        else if (password.length < 5){
            notify.show('Your password must be at least 6 characters long.', "custom", 5000, myColor)
        }
        else if (location.length < 3){
            notify.show('Your location must be at least 3 characters long', "custom", 5000, myColor)
        }
        else {
            
            let baseURL = config.url + '/signup'
          
            axios.post(baseURL, { username: userName, password: password, location: location })
                .then(res => {
              
                    localStorage.setItem('token', res.data);
                    window.location.href = '/homepage'
                    // this.props.signUpStateHandler(respond.data)
                })
                .catch(err => {
                    console.log(err)
                    
                })
        }
    }
    render() {
        return (
            <form onSubmit={this.submitHandler}>
            
                <Card className='large'
                    actions={[<a role="button" onClick={this.submitHandler} >Sign Me Up</a>]}>
                    <Input s={6} label="User name" name="userName" />
                    <Input type="Password" label="Password" s={12} name="password" />
                    <Input type="Password" label="Re-enter password" s={12} name="passwordCheck" />
                    <Input type="text" label="Location" s={30} name="location" />
                </Card>
            </form>
        )
    }
}


export default Signup