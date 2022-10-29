import React from 'react';
import PropTypes from 'prop-types';

class Checkout extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [],
      price: 0,
      fullname: '',
      email: '',
      cpf: '',
      phone: '',
      cep: '',
      address: '',
      payment: '',
      btnDis: '',
      isValid: false,
    };
  }

  componentDidMount() {
    let total = 0;
    const saved = JSON.parse(localStorage.getItem('cartItems'));
    saved.forEach((obj) => {
      total += obj.price * obj.quantity;
    });
    this.setState({ items: saved, price: total });
  }

  handleInput = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  isBtnDisabled = () => {
    const { history } = this.props;
    const { fullname, email, cpf, phone, cep, address, payment } = this.state;
    const personalInfo = fullname !== '' && email !== '' && cpf !== '';
    const contatInfo = phone !== '' && cep !== '' && address !== '' && payment !== '';
    if (personalInfo && contatInfo) {
      this.setState({
        isValid: true,
      });
      localStorage.setItem('cartItems', JSON.stringify([]));
      history.push('/');
    } else {
      this.setState({
        btnDis: 'Campos inválidos',
      });
    }
  };

  render() {
    const {
      items, price, fullname, email, cpf, phone, cep, address, payment, btnDis, isValid,
    } = this.state;
    return (
      <>
        <div>
          { items.length > 0
            && (
              items.map((obj, index) => (
                <div key={ index }>
                  <img src={ obj.thumbnail } alt={ obj.title } />
                  <p>{ `Quantidade: ${obj.quantity}` }</p>
                  <h4>{ obj.title }</h4>
                  <h3>{ `R$ ${obj.price * obj.quantity}` }</h3>
                </div>
              ))
            )}
          <h3>{ `Valor total: ${price}` }</h3>
        </div>
        <form>
          <label htmlFor="fullname">
            Nome completo
            <input
              name="fullname"
              id="fullname"
              data-testid="checkout-fullname"
              type="text"
              onChange={ this.handleInput }
              value={ fullname }
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              name="email"
              data-testid="checkout-email"
              type="text"
              value={ email }
              id="email"
              onChange={ this.handleInput }
            />
          </label>
          <label htmlFor="cpf">
            CPF
            <input
              name="cpf"
              value={ cpf }
              data-testid="checkout-cpf"
              type="text"
              id="cpf"
              onChange={ this.handleInput }
            />
          </label>
          <label htmlFor="phone">
            Telefone
            <input
              value={ phone }
              name="phone"
              data-testid="checkout-phone"
              type="text"
              id="phone"
              onChange={ this.handleInput }
            />
          </label>
          <label htmlFor="cep">
            CEP
            <input
              name="cep"
              value={ cep }
              data-testid="checkout-cep"
              type="text"
              id="cep"
              onChange={ this.handleInput }
            />
          </label>
          <label htmlFor="address">
            Endereço
            <input
              name="address"
              id="address"
              value={ address }
              data-testid="checkout-address"
              type="text"
              onChange={ this.handleInput }
            />
          </label>
          <h3>Método de pagamento</h3>
          <label htmlFor="boleto">
            <input
              data-testi="ticket-payment"
              value="boleto"
              checked={ payment === 'boleto' }
              type="radio"
              id="boleto"
              name="payment"
              onChange={ this.handleInput }
            />
            Boleto
          </label>
          <label htmlFor="visa">
            <input
              name="payment"
              id="visa"
              value="visa"
              checked={ payment === 'visa' }
              data-testid="visa-payment"
              type="radio"
              onChange={ this.handleInput }
            />
            Visa
          </label>
          <label htmlFor="mastercard">
            <input
              id="mastercard"
              data-testid="master-payment"
              type="radio"
              value="mastercard"
              checked={ payment === 'mastercard' }
              name="payment"
              onChange={ this.handleInput }
            />
            MasterCard
          </label>
          <label htmlFor="elo">
            <input
              name="payment"
              id="elo"
              value="elo"
              checked={ payment === 'elo' }
              data-testid="elo-payment"
              type="radio"
              onChange={ this.handleInput }
            />
            Elo
          </label>
          <button onClick={ this.isBtnDisabled } type="button" data-testid="checkout-btn">
            Comprar
          </button>
          { (btnDis !== '' && !isValid) && <h3 data-testid="error-msg">{ btnDis }</h3> }

        </form>
      </>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Checkout;
