import React from 'react';
import {Link} from 'react-router';



class HomePage extends React.Component{
  render(){
    return (
      <div>
        <h1>Home</h1>
        <Link to="About" className="btn btn-primary btn-lg">Learn More</Link>
      </div>
    );
  }
}

export default HomePage;
