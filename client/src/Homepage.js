import React, { Component } from 'react';
import axios from 'axios'
import List from './List'
import Header from './Header'
import Legend from './Legend'
import config from './config.js'

class Homepage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };
    }
    componentDidMount() {

        let baseURL = config.url + '/messages'
        axios({
            method: 'get',
            url: baseURL,
            headers: { 'authorization': localStorage.getItem('token') }
        })
            .then(res => {
                    return this.setState({
                        data: res.data
                    })
            })
            .catch(err => {
                console.log(err.response)
                // if (err.response.status === 301) {
                //     window.location.href = "/"
                // }
                // else {
                //     console.log(err)
                //     alert('message not sent');
                // }
            })
    }

    filterMessages=(e, param)=>{
        
        let baseURL = config.url + '/messages'
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
      
        return (
            <div>
                <Header />
                <div className="inbox-container">
                <h3 className="heading">Click a bottle to view the message</h3>
                <div className="legend-container">
                <div className="legend">
                    <div><span className="fear box"></span><p onClick={(e) => this.filterMessages(e, 'Fear')}>Fear</p></div>
      <div><span className="anger box" ></span><p onClick={(e) => this.filterMessages(e, 'Anger')}>Anger</p></div>
      <div><span className="joy box"></span><p onClick={(e) => this.filterMessages(e, 'Joy')}>Joy</p></div>
      <div><span className="sadness box"></span><p onClick={(e) => this.filterMessages(e, 'Sadness')}>Sadness</p></div>
      <div><span className="happy box"></span><p onClick={(e) => this.filterMessages(e, 'Happy')}>Happy</p></div>
      <div><span className="disgust box"></span><p onClick={(e) => this.filterMessages(e, 'Disgust')}>Disgust</p></div>
                </div>
            </div>
                <List data={data} />
                </div>
            </div>
        )
    }
}

export default Homepage