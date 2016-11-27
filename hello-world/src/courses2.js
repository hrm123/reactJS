import React, { Component } from 'react';

//(function(){
    class  Courses2 extends Component {
        render(){
            return( // we can only return one top level element
                <p> Course Name: <input type="text" placeholder="Enter coursename"/>
                The Date is {this.props.date.toString()}
                <p className="notesFont">React component using ES2015 syntax - derive from Component.</p>
                </p>
            );
        }

    };

   // var courseElement = <Courses date={new Date()}/>;
    //React.render(courseElement.document.getElementbyId('root'));
//})();
export default Courses2;
