import React, { Component } from 'react';

class InboxMessage extends Component {

    
    render() {
        return (
            <div className="text">
                <div>message: {this.props.message.message}</div>
                <div>tone: {this.props.message.tone}</div>
                <div>{this.state.data}</div>
            </div>

        )
    }
}

export default InboxMessage