import React, { Component } from 'react';
import axios from 'axios'
import { Button, Icon, Modal } from 'react-materialize';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import config from './config.js'

class InboxList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            replydata: {}
        };
    }
    componentDidMount() {
        if(this.props.message._id !== undefined)
        {
        let baseURL = config.url + '/replies/' + this.props.message._id
        console.log(baseURL);
        axios({
            method: 'get',
            url: baseURL,
            headers: { 'authorization': localStorage.getItem('token') }
        })
            .then(res => {
                console.log(res.data)
                return this.setState({
                    replydata: res.data
                })
            })
            .catch(err => {
                console.log(err)
            })
        }
    }



    render() {

        const data = this.state.replydata;
        let replies = [];

        //push the new filtered list into label array based on the if statements above 
        if (data.length > 0) {
            replies.push(<p className="heading">Replies</p>)
            for (let item in data) {

                replies.push(
                    //this is creating an instance of a Todo item from component 5 below.
                    //filteredList[item] sends each todo item, index sends the index value
                    //markDone 
                    <div className={"reply-row " + data[item].tone.toLowerCase()}>
                        <div className="reply-text">{data[item].message}</div>
                        <div className="reply-location">{data[item].location}</div>
                    </div>
                );
            }
        }
        else{
            replies.push(<p className="heading">No replies yet :(</p>)
        }

        let label;
        label = <div className='reply-button'>
            <Modal className={"modal " + this.props.message.tone.toLowerCase()} header={this.props.message.message}
                 ref="replyModal"
                trigger={
                    <div className={"message-box " + this.props.message.tone.toLowerCase()} >
                    <div className="text">message: {this.props.message.message}</div>
                    <div className="tone">{this.props.message.tone}</div>
                    <div className="location">{this.props.message.location}</div>
                    </div>
                }>
                <div>
                {replies}
                </div>

            </Modal>


            {/* <button onClick={this.goToReply(this.props.message._id)}>Reply</button> */}
        </div>

        return (
            <div>
                {label}
            </div>
        )
    }
}

export default InboxList