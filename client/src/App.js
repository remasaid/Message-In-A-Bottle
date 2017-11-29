import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Homepage from './Homepage'
import Landing from './Landing'
import Create from './Create'
import Inbox from './Inbox'
import Reply from './Reply'


class App extends Component {
  constructor(){
    super()
    this.state={
      loggedIn: false,
      loggedInUser: '',
      messages: []
      // signUpShow: false,
      // signInShow: false
    }
  }
    //sign up state function 
  //this is triggered when you actually sign up
  signUpStateHandler = (username) => {
    console.log(username)
    this.setState({
      loggedIn: true,
      loggedInUser: username,
      // signUpShow: false,
      // signInShow: false
    })
  }



  render() {
    return (
      <div className="App">
      
        
        <Router>
          <Switch>
          <Route exact path='/' component={Landing}/>
          <Route path='/homepage' component={Homepage} />
          <Route path='/inbox' component={Inbox} />
          <Route path='/create' component={Create} />
          <Route path='/reply' component={Reply} />
          </Switch>
       </Router>
      </div>
    );
  }
}

export default App;
