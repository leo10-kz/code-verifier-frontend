import React from 'react';
import './App.css';
import AppRoutes from './routes/Routes';
import StickyFooter from './components/dashboard/StickyFooter';

function App() {
  return (
    <div className="App">
     <AppRoutes />
     <StickyFooter />
    </div>
  );
}

export default App;
