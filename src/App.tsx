import React from 'react';

import Header from './components/Header';

const App = () => {
  return (
    <>
      <Header />
      <main>
        <section className="section">
          <header className="section__header">
            <h2 className="section__title">Subjects</h2>
          </header>
          <div className="section__body">
          </div>
        </section>
      </main>
    </>
  );
};

export default App;
