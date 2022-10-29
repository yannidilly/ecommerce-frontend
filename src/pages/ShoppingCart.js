import React from 'react';
import PropTypes from 'prop-types';

class ShoppingCart extends React.Component {
  constructor() {
    super();
    this.state = {
      cart: [],
      price: 0,
    };
  }

  componentDidMount() {
    const cartSaved = JSON.parse(localStorage.getItem('cartItems'));
    if (!cartSaved) return;
    this.setState({ cart: [...cartSaved] }, () => this.checkPrice());
  }

  checkPrice = () => {
    const { cart } = this.state;
    let totalPrice = 0;
    cart.forEach((obj) => {
      const itemQuantity = obj.quantity;
      totalPrice += (Number(obj.price.toFixed(2)) * itemQuantity);
    });
    this.setState((prev) => ({
      price: (prev.price + totalPrice),
    }));
  };

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
    let value = 0;
    if (action === 'decrease' && obj.quantity > 1) {
      // add min = 1
      obj.quantity -= 1;
      value -= obj.price;
    }
    if (action === 'increase') {
      obj.quantity += 1;
      value += obj.price;
    }
    const cartItemsFiltered = cart
      .filter((item, index) => cart.indexOf(item) === index);
    this.setState(
      (prev) => ({ cart: cartItemsFiltered, price: (prev.price + value) }),
      () => localStorage.setItem('cartItems', JSON.stringify(cart)),
    );
  };

  finalBtnClick = () => {
    const { history } = this.props;
    history.push('/shoppingCart/checkout');
  };

  render() {
    const { cart, price } = this.state;
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
        { cart.length > 0
          && (
            <>
              <p>{ `Valor da compra: ${price}` }</p>
              <button
                data-testid="checkout-products"
                onClick={ this.finalBtnClick }
                type="button"
              >
                Finalizar compra
              </button>
            </>
          )}
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ShoppingCart;
