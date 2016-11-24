import React, { Component } from 'react';

//(function(){
    var Courses1 = function(props){

         var inlineStyle = {
            'font-size': '0.6em',
            'color': 'blue'
        };
         return ( <p> Course Name: <input type="text" placeholder="Enter coursename"/>   The Date is {props.date.toString()}  
                    <p style={inlineStyle}> Stateless React component with pure javascript function.</p>
                </p>
            );
            
    };

   // var courseElement = <Courses date={new Date()}/>;
    //React.render(courseElement.document.getElementbyId('root'));
//})();
export default Courses1;