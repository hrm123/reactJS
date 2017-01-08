import React from 'react';
import {Link} from 'react-router';



class NavCtl extends React.Component{
  render(){
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">Home</div>
        <Link to="About" className="btn btn-primary btn-lg">Learn More</Link>
      </nav>
    );
  }
}

export default NavCtl;
