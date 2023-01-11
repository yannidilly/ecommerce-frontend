import React from 'react';
import PropTypes from 'prop-types';
import '../style/Header.css';

class Header extends React.Component {
  onClickButton = () => {
    const { history } = this.props;
    history.push('/shoppingCart');
  };

  render() {
    return (
      <header className="header-div">
        <div className="brand-div">
          <img className="logo" src="https://img.icons8.com/cotton/64/null/shop-department.png" alt="logo DPT" />
          <h1>DPT - Department Store</h1>
        </div>
        <button
          data-testid="shopping-cart-button"
          className="shopping-button"
          type="button"
          name="button"
          onClick={ this.onClickButton }
        >
          Shopping Cart
        </button>
      </header>
    );
  }
}

Header.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Header;
