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
    });
  }

  async componentDidMount() {
    const itens = JSON.parse(localStorage.getItem('cartItems')); // transforma o value do storage em array, ele está guardado como string.
    if (itens) {
      this.setState({ allItens: [...itens] });
    }
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
  }

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

  render() {
    const { product, sellerLocal, condicao, freeShip } = this.state;
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
        <Link to="/">VOLTAR</Link>
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
