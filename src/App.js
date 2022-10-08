import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';
import ShoppingCart from './pages/ShoppingCart';
import ItemPage from './pages/ItemPage';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" component={ Home } />
        <Route
          path="/shoppingCart"
          render={ (props) => <ShoppingCart { ...props } /> }
        />
        <Route path="/products/:id" render={ (props) => <ItemPage { ...props } /> } />
      </BrowserRouter>
    );
  }
}

export default App;
