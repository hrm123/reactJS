/**
 * Created by Ramm on 2/10/2018.
 */
import React from 'react';
// import { Router } from 'react-router';
import {
  HashRouter,
  Route,
} from 'react-router-dom';

import UserDetails from './components/userDetails';
import Step from './components/step';
import Summary from './components/summary';
import Scores from './components/scores';

const AppRoutes = () => (
  <HashRouter>
    <div>
      <Route path="/" component={UserDetails} />
      <Route path="/step" component={Step} />
      <Route path="/summary" component={Summary} />
      <Route path="/scores" component={Scores} />
    </div>
  </HashRouter>
);

export default AppRoutes;
