import React, { Component } from 'react';
import axios from 'axios'
import { Button, Icon, Modal } from 'react-materialize';
import Bottle from './bottle'
import Notifications, { notify } from 'react-notify-toast';

class Message extends Component {



    submitReply = (e) => {
        e.preventDefault()
        let message = this.refs.messageText.value
        console.log(message);
        let baseURL = 'http://localhost:8080/reply/' + this.props.message._id
        axios({
            method: 'post',
            url: baseURL,
            headers: { 'authorization': localStorage.getItem('token') },
            data: {
                message: message
            }

        })
            .then(res => {
                document.querySelector('.modal-overlay').click();
                let myColor = { background: '#ff80ab', text: "#FFFFFF" };
                notify.show('Message sent!', "custom", 5000, myColor)
            })
            .catch(err => {
                if (err.response.status === 301) {
                    window.location.href = "/"
                }
                else {
                    console.log(err)
                    notify.show('Message failed!');
                }
            })


    }
    render() {


        let replies;
        if (this.props.message.replies === true) {
            replies = <div className='reply-button'>
                <Modal
                    header={this.props.message.message} ref="replyModal" actions={<Button flat={true} waves='orange' onClick={this.submitReply}><Icon left>reply</Icon>Send Reply</Button>}
                    trigger={<div><Bottle id={this.props.message._id} tone={this.props.message.tone} /></div>}>
                    <div>
                        <div className="location">{this.props.message.location}</div>
                        <form action="#">
                            <input placeholder="Type your reply here :)" type="text" ref="messageText" /><br />
                            {/* <input type="hidden" value= {this.props.message._id} /> */}
                        </form>
                    </div>

                </Modal>

            </div>
        }
        else {
            replies = <div className='reply-button'>
                <Modal
                    header='Message' ref="replyModal"
                    trigger={<div><Bottle id={this.props.message._id} tone={this.props.message.tone} /></div>}>
                    <div>
                        <div className="original-message">{this.props.message.message}</div>
                    </div>

                </Modal>

            </div>
        }

        console.log(this.props.data)
        return (
            <div >
                <Notifications />
                <div>{replies}</div>
            </div>

        )
    }
}

export default Message