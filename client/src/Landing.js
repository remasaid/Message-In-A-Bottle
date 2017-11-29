import React, { Component } from 'react';
import Signup from './Signup'
import Signin from './Signin'
import axios from 'axios'
import { Tabs, Tab } from 'react-materialize';
import Notifications, { notify } from 'react-notify-toast';

class Landing extends Component {


    render() {
        if (localStorage.getItem('token') !== null) {
            let baseURL = config.url + '/validtoken'
            axios({
                method: 'post',
                url: baseURL,
                headers: { 'authorization': localStorage.getItem('token') }
            })
                .then(res => {
                    if (res.status === 200) {
                        window.location.href = "/homepage"
                    }
                    else {
                        localStorage.clear();
                    }
                })
                .catch(err => {
                    if (err.response.status === 301) {
                        localStorage.clear();
                    }
                    else {
                        console.log(err)
                        localStorage.clear();
                    }
                })
        }

        return (
            <div className='landing'>
                <Notifications />
                <div className="content">
                    <h1 className="brand-logo">Message in a bottle</h1>
                    <div className="tabs-holder">
                    <Tabs className='tabs'>
                        <Tab title="Sign In" active><Signin /></Tab>
                        <Tab title="Sign Up"><Signup Signup={this.signupStateHandler} /></Tab>
                    </Tabs>
                    </div>
                </div>
            </div>
        )
    }
}

export default Landing