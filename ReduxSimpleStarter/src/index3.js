import React,{Component} from 'react';
import ReactDOM from 'react-dom';

const App = function() {
    return <div id="innerDiv">Hi!</div>; //this is JSX.. much more natural reprerenstation of component then javascript
}

const App1 = () => { //ES6 method syntax
    return <div>Hi1! <App /></div> ; 
}


class App2 extends React.Component{ //ES6 lasses syntax
    render(){
        return <div>Hi2! <App /></div> ; 
    }
}
//var container = document.getElementById('containerDiv');
//ReactDOM.render(React.createElement(App), container) ; ;
ReactDOM.render(<App2 />, document.querySelector('div#containerDiv'));
//ReactDOM.render(, document.querySelector('div#innerDiv'));