import React, { Component } from 'react';

class Legend extends Component {

    render() {

        

        return (
            //this returns the label array constructed above in the render
            <div className="legend-container">
                <div className="legend">
                    <div><span className="fear box"></span><p>Fear</p></div>
      <div><span className="anger box" ></span><p>Anger</p></div>
      <div><span className="joy box"></span><p>Joy</p></div>
      <div><span className="sadness box"></span><p>Sadness</p></div>
      <div><span className="happy box"></span><p>Happy</p></div>
      <div><span className="disgust box"></span><p>Disgust</p></div>
                </div>
            </div>
        )
    }
}

export default Legend