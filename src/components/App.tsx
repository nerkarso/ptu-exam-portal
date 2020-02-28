import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { withTracker } from '../hooks/GoogleAnalytics';

import Home from './pages/Home';
import Settings from './pages/Settings';
import Subject from './pages/Subject';

const App: React.FC = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path="/" component={withTracker(Home)} exact />
        <Route path="/settings" component={withTracker(Settings)} />
        <Route path="/subjects/:id" component={Subject} />
      </Switch>
    </Router>
  );
};

export default App;
