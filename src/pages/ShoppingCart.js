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
    if (!cartSaved) return;
    this.setState({ cart: [...cartSaved] });
  }

  remove = (obj) => {
    const cartSaved = JSON.parse(localStorage.getItem('cartItems'));
    const clickedItem = cartSaved.find((item) => item.id === obj.id);
    const clickedItemIndex = cartSaved.indexOf(clickedItem);
    cartSaved.splice(clickedItemIndex, 1);
    this.setState(
      ({ cart: cartSaved }),
      () => localStorage.setItem('cartItems', JSON.stringify(cartSaved)),
    );
  };

  quantityManipulate = (obj, action) => {
    const { cart } = this.state;
    if (action === 'decrease' && obj.quantity > 1) {
      // add min = 1
      obj.quantity -= 1;
    }
    if (action === 'increase') {
      obj.quantity += 1;
    }
    const cartItemsFiltered = cart
      .filter((item, index) => cart.indexOf(item) === index);
    this.setState(
      ({ cart: cartItemsFiltered }),
      () => localStorage.setItem('cartItems', JSON.stringify(cart)),
    );
  };

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
                  <button
                    type="button"
                    data-testid="remove-product"
                    onClick={ () => this.remove(obj) }
                  >
                    Remover
                  </button>
                  <div>
                    <img src={ obj.thumbnail } alt={ obj.title } />
                  </div>
                  <div>
                    <h4 data-testid="shopping-cart-product-name">{obj.title}</h4>
                    <div className="quantity-item-manipulate">
                      <button
                        data-testid="product-decrease-quantity"
                        type="button"
                        onClick={ () => this.quantityManipulate(obj, 'decrease') }
                      >
                        Diminuir
                      </button>
                      <p data-testid="shopping-cart-product-quantity">{obj.quantity}</p>
                      <button
                        data-testid="product-increase-quantity"
                        type="button"
                        onClick={ () => this.quantityManipulate(obj, 'increase') }
                      >
                        Aumentar
                      </button>
                    </div>
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
