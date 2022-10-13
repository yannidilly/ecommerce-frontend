import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';

class ItemPage extends React.Component {
  constructor() {
    super();
    this.state = ({
      product: {},
      sellerLocal: '',
      condicao: '',
      freeShip: '',
      allItens: [],
      email: '',
      note: '',
      text: '',
      ratings: [],
      isPostable: '',
    });
  }

  async componentDidMount() {
    const itens = JSON.parse(localStorage.getItem('cartItems')); // transforma o value do storage em array, ele está guardado como string.
    if (itens) {
      this.setState({ allItens: [...itens] });
    }
    const { match: { params: { id } } } = this.props;
    await this.infoHandler();
    const savedRatings = JSON.parse(localStorage.getItem(id));
    if (savedRatings) this.setState({ ratings: [...savedRatings] });
  }

  componentDidUpdate() {
    const { ratings } = this.state;
    const { match: { params: { id } } } = this.props;
    localStorage.setItem(id, JSON.stringify(ratings));
  }

  infoHandler = async () => {
    const { match: { params: { id } } } = this.props;
    const pageItem = await getProductById(id);
    const {
      seller_address: { city: { name } },
      shipping: { free_shipping: fS },
    } = pageItem;
    let { condition } = pageItem;
    if (condition === 'new') {
      condition = 'Novo';
      return this.setState({
        product: pageItem,
        sellerLocal: name,
        condicao: condition,
        freeShip: fS,
      });
    }
    condition = 'Usado';
    this.setState({
      product: pageItem,
      sellerLocal: name,
      condicao: condition,
      freeShip: fS,
    });
  };

  handleInput = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  componentDidUpdate() {
    const { allItens } = this.state;
    localStorage.setItem('cartItems', JSON.stringify(allItens));
  }

  cartBtnClick = () => {
    const { product, allItens } = this.state;
    this.setState({
      allItens: [...allItens, product],
    });
    // history.push('/shoppingCart');
    localStorage.setItem('TERTULIO', JSON.stringify(product));
  };

  cardBtnClick = () => {
    const { history } = this.props;
    history.push('/shoppingCart');
  };

  handleRadio = ({ target }) => {
    const { value } = target;
    this.setState({ note: value });
  };

  clickSendBtn = (e) => {
    e.preventDefault();
    const { ratings, email, note, text } = this.state;
    const saveRating = { email, text, note };
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+?$/i;
    if (regex.test(email) && note !== '') {
      return this.setState({
        ratings: [...ratings, saveRating],
        email: '',
        text: '',
        isPostable: '',
        note: '',
      });
    }
    this.setState({
      ratings: [...ratings],
      email,
      text,
      isPostable: 'Campos inválidos',
      note,
    });
  };

  render() {
    const {
      text,
      product,
      sellerLocal,
      condicao,
      freeShip,
      email,
      ratings,
      isPostable,
      note,
    } = this.state;
    return (
      <div>
        <button
          data-testid="shopping-cart-button"
          type="button"
          onClick={ this.cardBtnClick }
        >
          ShoppingCart
        </button>
        <div>
          <h2
            data-testid="product-detail-name"
          >
            { `${product.title}` }

          </h2>
          <h1 data-testid="product-detail-price">{ `R$ ${product.price}` }</h1>
        </div>
        <div>
          <img
            data-testid="product-detail-image"
            src={ product.thumbnail }
            alt={ product.title }
          />
        </div>
        <div>
          <h2>Informações gerais</h2>
          <p>{ `Localização do vendedor: ${sellerLocal}` }</p>
          <p>{ `Quantidade disponível: ${product.available_quantity}` }</p>
          <p>{ `Estado: ${condicao}` }</p>
          { freeShip && <p>Entrega grátis!</p> }
          <button
            onClick={ this.cartBtnClick } // BOTAO DA TELA DE INFORMACAO DETALHADA DO PRODUTO
            type="button"
            data-testid="product-detail-add-to-cart"
          >
            Adicionar ao carrinho
          </button>
        </div>
        <form>
          <input
            name="email"
            onChange={ this.handleInput }
            value={ email }
            type="text"
            data-testid="product-detail-email"
          />
          <input
            data-testid="1-rating"
            value="1"
            type="radio"
            name="rating"
            checked={ note === '1' }
            onChange={ this.handleRadio }
          />
          {' '}
          1
          <input
            data-testid="2-rating"
            value="2"
            type="radio"
            name="rating"
            checked={ note === '2' }
            onChange={ this.handleRadio }
          />
          {' '}
          2
          <input
            data-testid="3-rating"
            value="3"
            type="radio"
            name="rating"
            checked={ note === '3' }
            onChange={ this.handleRadio }
          />
          {' '}
          3
          <input
            data-testid="4-rating"
            value="4"
            type="radio"
            name="rating"
            checked={ note === '4' }
            onChange={ this.handleRadio }
          />
          {' '}
          4
          <input
            data-testid="5-rating"
            value="5"
            type="radio"
            name="rating"
            checked={ note === '5' }
            onChange={ this.handleRadio }
          />
          {' '}
          5
          <textarea
            onChange={ this.handleInput }
            name="text"
            value={ text }
            data-testid="product-detail-evaluation"
          />
          <button
            data-testid="submit-review-btn"
            onClick={ this.clickSendBtn }
            type="submit"
          >
            Avaliar
          </button>
        </form>
        { isPostable !== '' && <h4 data-testid="error-msg">{ isPostable }</h4> }
        { ratings.length > 0
          && (
            ratings.map((obj, index) => (
              <div key={ index }>
                <h4 data-testid="review-card-email">{ obj.email }</h4>
                <h3 data-testid="review-card-rating">{ obj.note }</h3>
                <p data-testid="review-card-evaluation">{ obj.text }</p>
              </div>
            ))
          )}
      </div>
    );
  }
}

ItemPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ItemPage;
