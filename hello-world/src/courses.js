import React, { Component } from 'react';

//(function(){
    var Courses = React.createClass({
        render: function(){
            return( // we can only return one top level element
                <p> Course Name: <input type="text" placeholder="Enter coursename"/>
                The Date is {this.props.date.toString()}
                <p className="notesFont">React component using 'React.createClass' method - original method.</p>
                </p>
            );
        }

    });

   // var courseElement = <Courses date={new Date()}/>;
    //React.render(courseElement.document.getElementbyId('root'));
//})();
export default Courses;
