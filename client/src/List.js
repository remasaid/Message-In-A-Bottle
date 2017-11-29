import React, { Component } from 'react';
import Message from './Message'

class List extends Component {

    render() {

        let label = [];
        let list = this.props.data
        //push the new filtered list into label array based on the if statements above
        for (let item in list) {

            label.push(
                //this is creating an instance of a Todo item from component 5 below.
                //filteredList[item] sends each todo item, index sends the index value
                //markDone 
                <div className="bottle-box">
                    <Message key={item} message={list[item]} />
                </div>
            );
        }

        return (
            //this returns the label array constructed above in the render
            
                <div>
                    {label}
                </div>
            
        )
    }
}

export default List