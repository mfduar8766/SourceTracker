import React from 'react';
import openOffice from './assets/openOffice.jpg';

const App = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateRows: 'repeat(1, 1fr)'
    }}
  >
    <div>
      <img src={openOffice} style={{ width: '100%' }} />
    </div>
  </div>
);

export default App;
