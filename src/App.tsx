import React from 'react';

import Header from './components/Header';
import Subject from './components/Subject';

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
    <>
      <Header />
      <main>
        <section className="section">
          <header className="section__header">
            <h2 className="section__title">Subjects</h2>
          </header>
          <div className="section__body">
            <div className="subjects">
              {subjects.map(subject => (
                <Subject info={subject} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default App;
