import React from 'react';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';

class ItemPage extends React.Component {
  constructor() {
    super();
    this.state = ({
      product: {},
      sellerLocal: '',
      condicao: '',
      freeShip: '',
    });
  }

  async componentDidMount() {
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

  cartBtnClick = () => {
    const { history } = this.props;
    history.push('/shoppingCart');
  };

  render() {
    const { product, sellerLocal, condicao, freeShip } = this.state;
    return (
      <div>
        <div>
          <h2 data-testid="product-detail-name">{ `${product.title}` }</h2>
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
            onClick={ this.cartBtnClick }
            type="button"
            data-testid="shopping-cart-button"
          >
            Adicionar ao carrinho
          </button>
        </div>
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
