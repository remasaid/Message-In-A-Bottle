import React from 'react';
import {Icon, Navbar, NavItem} from 'react-materialize';


class Header extends React.Component {
    logoutUser=(event)=>{
        event.preventDefault();
        localStorage.clear();
        window.location.href="/"
    
      }

    render() {
        let hasToken = [];
        if(localStorage.getItem('token') !== null) {
            hasToken = <div>
            <NavItem href='/homepage'><Icon>home</Icon></NavItem><NavItem href='/inbox'><Icon>chat</Icon></NavItem>
            <NavItem href="/create" ><Icon>create</Icon></NavItem><NavItem href="/" onClick={this.logoutUser}><Icon>power_settings_new</Icon></NavItem></div>
        }
        return (
            <div className='navbar'>
            {/* <button onClick={this.logoutUser}>Log Out</button>  */}
            <Navbar brand='Message In A Bottle' left className='navbar'>
            {hasToken}
        </Navbar>
        </div>
        )
    
    }
}


export default Header