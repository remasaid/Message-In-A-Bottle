import React, { Component } from 'react';
import Header from './Header'

class Reply extends Component {

    render() {


        return (
            <div>
                <Header />
                <h1>Reply</h1>
                <div>
                    <p className="subheading dark">Create A New Message</p>
                    <input placeholder="Type your message here :)" type="text" ref="userName" /><br />
                    <button type="submit" className="button" >Send my message in a bottle</button>
                    
                </div>

            </div>
        )
    }
}

export default Reply

