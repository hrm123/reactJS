import React from 'react';
import {Route, IndexRoute } from 'react-router';

import App from './components/app';
import Posts from './components/posts_index';
import PostsNew from './components/posts_new';

const Greeting = () => {
    return <div>Hey there!</div>
};

export default (
<Route path="/" component={App} >
    <IndexRoute   component={Posts} />
    <Route path="posts/new" component={PostsNew} />
    <Route path="greet2" component={Greeting} />
    <Route path="greet3" component={Greeting} />
</Route>
);