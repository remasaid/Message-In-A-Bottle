import config from './config.js'
import React, { Component } from 'react';
import axios from 'axios'
import Header from './Header'
import InboxList from './InboxList'
import ReactDOM from 'react-dom'

class Inbox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };
    }
    componentDidMount() {

        let baseURL = config.url + '/getinbox'
        axios({
            method: 'get',
            url: baseURL,
            headers: { 'authorization': localStorage.getItem('token') },
        })
            .then(res => {
                console.log(res.status);
                    return this.setState({
                        data: res.data
                    })

            })
            .catch(err => {
                if (err.response.status === 301) {
                    window.location.href = "/"
                }
                else{
                console.log(err.response)
                }
            })
    }

    filterMessages=(e, param)=>{
        
        let baseURL = config.url + '/getinbox'
        axios({
            method: 'get',
            url: baseURL,
            headers: { 'authorization': localStorage.getItem('token'), 'filter':param}
        })
            .then(res => {
                    return this.setState({
                        data: res.data
                    })
            })
            .catch(err => {
                console.log(err.response)
                return;
            })
    }

    render() {
        const data = this.state.data;
        let label = [];
        let list = data
        for (let item in list) {
            label.push(
                //this is creating an instance of a Todo item from component 5 below.
                //filteredList[item] sends each todo item, index sends the index value
                //markDone 
                
                    <InboxList key={item} message={list[item]} />
            );
        }

        return (
            <div>
                <Header />
                <h3>Welcome to your inbox.</h3>
                <h5>Select a message to view replies</h5>
                <div className="inbox-container">
                <div className="legend-container">
                <div className="legend">
                    <div><span className="fear box"></span><p onClick={(e) => this.filterMessages(e, 'Fear')}>Fear</p></div>
      <div><span className="anger box" ></span><p onClick={(e) => this.filterMessages(e, 'Anger')}>Anger</p></div>
      <div><span className="joy box"></span><p onClick={(e) => this.filterMessages(e, 'Joy')}>Joy</p></div>
      <div><span className="sadness box"></span><p onClick={(e) => this.filterMessages(e, 'Sadness')}>Sadness</p></div>
      <div><span className="disgust box"></span><p onClick={(e) => this.filterMessages(e, 'Disgust')}>Disgust</p></div>
                </div>
            </div>
                {label}
                </div>
            </div>
        )
    }
}

export default Inbox