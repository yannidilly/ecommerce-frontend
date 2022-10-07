import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';
import ShoppingCart from './pages/ShoppingCart';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={ Home } />
      <Route path="/shoppingCart" render={ (props) => <ShoppingCart { ...props } /> } />
    </BrowserRouter>
  );
}

export default App;
