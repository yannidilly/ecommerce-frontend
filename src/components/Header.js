import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
  onClickButton = () => {
    const { history } = this.props;
    history.push('/shoppingCart');
  };

  render() {
    return (
      <section className="header-section">
        <div className="image-box">
          <img className="logo" src="" alt="logo mercado livre" />
        </div>
        <button
          data-testid="shopping-cart-button"
          type="button"
          name="button"
          onClick={ this.onClickButton }
        >
          Shopping Cart
        </button>
      </section>
    );
  }
}

Header.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Header;
