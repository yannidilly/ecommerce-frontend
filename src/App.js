import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';
import ShoppingCart from './pages/ShoppingCart';
import { getCategories } from './services/api';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
    };
  }

  async componentDidMount() {
    const cat = await getCategories();
    this.setState({ categories: cat });
  }

  render() {
    const { categories } = this.state;
    return (
      <>
        <div>
          { categories.map((obj) => (
            <button
              type="button"
              key={ obj.id }
              data-testid="category"
            >
              { obj.name }
            </button>
          )) }
        </div>
        <BrowserRouter>
          <Route exact path="/" component={ Home } />
          <Route path="/shoppingCart" render={ (props) => <ShoppingCart { ...props } /> } />
        </BrowserRouter>
      </>

    );
  }
}

export default App;
