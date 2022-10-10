import React from 'react';

class ShoppingCart extends React.Component {
  constructor() {
    super();
    this.state = {
      cart: [],
    };
  }

  componentDidMount() {
    const cartSaved = JSON.parse(localStorage.getItem('cartItems'));
    this.setState({ cart: [...cartSaved] });
  }

  render() {
    const { cart } = this.state;
    return (
      <div>
        {
          (cart.length === 0)
            ? (<p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>)
            : (
              cart.map((obj) => (
                <div className="cartItemDiv" key={ obj.id }>
                  <div>
                    <img src={ obj.thumbnail } alt={ obj.title } />
                  </div>
                  <div>
                    <h4 data-testid="shopping-cart-product-name">{obj.title}</h4>
                    <p data-testid="shopping-cart-product-quantity">1</p>
                  </div>
                  <div>
                    <h3>{ `R$ ${obj.price}` }</h3>
                  </div>
                </div>
              ))
            )
        }
      </div>
    );
  }
}

export default ShoppingCart;
