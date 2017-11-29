import React, { Component } from 'react';
import axios from 'axios'
import { Card, Input, Row } from 'react-materialize';
import Notifications, { notify } from 'react-notify-toast';
import config from './config.js'

class Signin extends Component {
    submitHandler = (event) => {
        event.preventDefault();
        let userName = document.querySelector('input[name=login_userName]').value;
        let password = document.querySelector('input[name=login_password]').value;
        let baseURL = config.url + '/login'

        let myColor = { background: '#ff80ab', text: "#FFFFFF" };
        
        axios.post(baseURL, { username: userName, password: password })
            .then(res => {
                if (res.status !== 200) {
                    // this.props.signInStateHandler(respond.data.user, respond.data.savedCoinsInDB)
                    // //save respond.data.token
                    notify.show('Incorrect username or password, please try again :)', "custom", 5000, myColor)
                    console.log(res)
                }
                else {
                    localStorage.setItem('token', res.data);
                    window.location.href = '/homepage'
                    console.log(res.data)
                }
            })
            .catch(err => {
                console.log(err)
                notify.show('Incorrect username or password, please try again :)', "custom", 5000, myColor)
            })
    }
    render() {
        return (
            <form onSubmit={this.submitHandler}>
                <Card className='large'
                    actions={[<a role="button" onClick={this.submitHandler} >Sign In</a>]}>
                    <Input s={6} label="User name" name="login_userName" />
                    <Input type="Password" label="Password" s={12} name="login_password" />
                </Card>
            </form>
        )
    }
}


export default Signin