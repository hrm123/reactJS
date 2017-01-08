import React, {Component } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';

class PostsNew extends Component{
    render(){
        const { fields: { title, categories, content}, handleSubmit } = this.props;
        console.log(title);
        return(
            <form onSubmit={handleSubmit}>
                <h3>Create a new post</h3>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control" />
                    <label>categories</label>
                    <input type="text" className="form-control" />
                    <label>Content</label>
                    <textarea className="form-control" />
                </div> 
            </form>
        );
    }
}

//connect : first argument is mapStateToProps, 2nd is mapDispatchtoProps
//reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd  is mapDispatchtoProps
export default reduxForm({
    form: 'PostsNewForm',
    fields: ['title', 'categories', 'content']
}, null,{ createPost})(PostsNew);