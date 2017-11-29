import React, { Component } from 'react';
import axios from 'axios'
import { Card, Input, Row } from 'react-materialize';
import Header from './Header'
import Notifications, { notify } from 'react-notify-toast';
import config from './config.js'
class Create extends Component {



    sendMessage = (e) => {
        e.preventDefault();



        let message = document.querySelector('textarea[name=messageText]').value
        console.log("Message: " + message)
        let replies = document.querySelector('input[name=replies]:checked').value
        let replyTones = [];
        Array.prototype.forEach.call(document.querySelectorAll('input[name=replytones]:checked'), function (check) {
            replyTones.push(check.value);
        })
        console.log(replyTones);
        let baseURL = config.url + '/create'
        axios({
            method: 'post',
            url: baseURL,
            headers: { 'authorization': localStorage.getItem('token') },
            data: {
                message: message,
                replies: replies,
                replySentiment: replyTones
            }
        })
            .then(res => {
                let myColor = { background: '#ff80ab', text: "#FFFFFF" };
                notify.show('Message sent!', "custom", 5000, myColor)
                setTimeout(() => {
                    window.location.href = "/homepage"
                }, 1000);
            })
            .catch(err => {
                if (err.response.status === 301) {
                    window.location.href = "/"
                }
                else {
                    console.log(err)
                    alert('message not sent');
                }
            })
    }

    hideSentiments = () => {
        document.querySelectorAll('input[name=replytones]').forEach(function(elem){
            elem.disabled = true;
        })
        
    }

    showSentiments = () => {
        document.querySelectorAll('input[name=replytones]').forEach(function(elem){
            elem.disabled = false;
        })
    }


    render() {

        return (
            <div>
                <Notifications />
                <Header />
                <h3 className="create-header">Create a new message</h3>
                <div className="new-message">
                    <Card className='medium'
                        actions={[<a role="button" onClick={this.sendMessage}>Send Message</a>]}>
                        <form ref="create" >
                            <Input type="textarea" name="messageText" className="wide" label="Type your message here :)" />
                            <Row>
                                <p className="heading">Would you like to receive replies?</p>
                                <div className="center">
                                    <Input name='replies' type='radio' onClick={this.showSentiments} value='true' label='Yes' defaultChecked='checked' />
                                    <Input name='replies' type='radio' onClick={this.hideSentiments} value='false' label='No' />
                                </div>
                            </Row>

                            <Row id="sentimentsRow">
                                <p className="heading">Only allow replies with the tones selected below.</p>
                                <Input name='replytones' type='checkbox' value='joy' label='Joy' defaultChecked='checked' />
                                <Input name='replytones' type='checkbox' value='anger' label='Anger' defaultChecked='checked' />
                                <Input name='replytones' type='checkbox' value='disgust' label='Disgust' defaultChecked='checked' />
                                <Input name='replytones' type='checkbox' value='fear' label='Fear' defaultChecked='checked' />
                                <Input name='replytones' type='checkbox' value='sadness' label='Sadness' defaultChecked='checked' />
                            </Row>
                        </form>
                    </Card>
                </div>
            </div>
        )
    }
}

export default Create


