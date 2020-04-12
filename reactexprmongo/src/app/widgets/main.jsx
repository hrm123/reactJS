import React from 'react';
import {Provider} from 'react-redux';
import {store} from '../store';
import {ConnectedDashboard} from './dashboard';
import {Router, Route} from 'react-router-dom';
import {hstory} from '../store/history';
import {ConnectedNav} from './nav';

export const Main = () => {
return (    
    <Router history={hstory}>
        <Provider store={store}>
            <div>
                <ConnectedNav />
                <Route  exact path="/dashboard" render={() => (<ConnectedDashboard />)}/>
            </div>
        </Provider>
    </Router>
);
}