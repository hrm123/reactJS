import React, { Component } from 'react';
import {connect} from 'react-redux';
import {selectBook} from '../actions/index'
import { bindActionCreators } from 'redux'  // this is fn that makes sure that action flows through all reducers in the app

class BookDetail extends Component {

    renderList(){
        return this.props.books.map( (bk) => {
            return (
                <li key={bk.title}
                onClick={() => this.props.selectBook(bk)}  // invoke the Action Creator that is injeccted bu Redux
                className="list-group-item">
                {bk.title}
                </li>
            );
        }); 
    }

    render(){
        if(!this.props.book){
            return <div>Select a book. </div>
        }
        return (
            <div>
                <h3> Details for</h3>
                <div>title: {this.props.book.title}</div>
                <div>pages: {this.props.book.pages}</div>
            </div>
        );
    }
}


function mapStateToProps(state){
    //whatever is returned from here will show up as props inside of BookList - so
    // this function IS THE GLUE between React and Redux.
    // 1. Whenever application state changes (we load books from server etc) this container will re-render with 
    // new list of books
    // 2. Whenever application state changes the object in state function will be assigned as props.
    return {
        book: state.activeBook // here state is global application state set by rootReducer
    };
}

/*
// Anything returned from this fn will end up as props on the BookList container
function mapDispatchToProps(dispatch){
    //whenever selectBook action is called, the result should be passed to all reducers in the app
    return bindActionCreators({selectBook:selectBook}, dispatch);
}
*/

// Promote BookList from aa component to container - it needs to know
// about this new dispatch metthod, selecctBook. make it available as a prop.
export default connect(mapStateToProps) ( BookDetail );
