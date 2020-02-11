import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './components/Header';
import SubjectCard from './components/SubjectCard';
import SubjectView from './components/SubjectView';

const App = () => {
  const subjects = [
    {
      color: 'grey',
      name: 'Subject',
      category: 'Notes',
      updated_at: 'Jan 1, 1970'
    }
  ];

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path="/" exact>
          <Header />
          <main>
            <section className="section">
              <header className="section__header">
                <h2 className="section__title">Subjects</h2>
              </header>
              <div className="section__body">
                <div className="grid">
                  {subjects.map(subject => (
                    <SubjectCard info={subject} />
                  ))}
                </div>
              </div>
            </section>
          </main>
        </Route>
        <Route path="/subjects/:id" component={SubjectView} />
      </Switch>
    </Router>
  );
};

export default App;
