import React from 'react';
import { Deck } from './components/Deck';
import ControlPanel from './components/ControlPanel';

function App() {
  return (
    <div className="app">
      <Deck />
      <ControlPanel />
    </div>
  );
}

export default App;
