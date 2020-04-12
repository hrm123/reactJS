import React from 'react';
import {Provider} from 'react-redux';
import {store} from '../store';
import {ConnectedDashboard} from './dashboard';
import {Router, Route} from 'react-router-dom';
import {hstory} from '../store/history';
import {ConnectedNav} from './nav';
import {ConnectedTaskDetail} from './taskdetail';

export const Main = () => {
return (    
    <Router history={hstory}>
        <Provider store={store}>
            <div>
                <ConnectedNav />
                <Route  exact path="/dashboard" render={() => (<ConnectedDashboard />)}/>
                <Route  exact path="/task/:id" render={({match}) => (<ConnectedTaskDetail match={match}/>)}/>
            </div>
        </Provider>
    </Router>
);
}