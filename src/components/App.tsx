import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Subject from './pages/Subject';

const App: React.FC = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/subjects/:id" component={Subject} />
      </Switch>
    </Router>
  );
};

export default App;
