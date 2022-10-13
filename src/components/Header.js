import React from 'react';
import PropTypes from 'prop-types';
import '/home/filipe/sd-025-b-project-frontend-online-store/src/services/header.css';

class Header extends React.Component {
  onClickButton = () => {
    const { history } = this.props;
    history.push('/shoppingCart');
  };

  render() {
    return (
      <section className="header-section">
        <div className="image-box">
          <img className="logo" src="https://logodownload.org/wp-content/uploads/2016/08/mercado-livre-logo-1-1.png" alt="logo mercado livre" />
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
