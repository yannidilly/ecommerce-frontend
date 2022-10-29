import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      searchText: '',
      items: [],
      nothing: '',
      categories: [],
      categorySearch: [],
      savedItems: [],
    };
  }

  async componentDidMount() {
    const save = localStorage.getItem('cartItems');
    const cat = await getCategories();
    if (!save) this.setState({ categories: cat });
    this.setState({ categories: cat });
  }

  componentDidUpdate() {
    const { savedItems } = this.state;
    const savedItemsFiltered = savedItems
      .filter((item, index) => savedItems.indexOf(item) === index); // o indexOf só retorna o index da primeira aparição do elemento, então não importa quantos tenha, o retorno sempre será apenas um
    if (savedItems.length > 0) {
      localStorage.setItem('cartItems', JSON.stringify(savedItemsFiltered));
    }
  }

  btnCartClick = ({ target }) => {
    const { categorySearch, items } = this.state;
    const { name } = target;
    if (categorySearch.results) {
      const itemSaved = categorySearch.results.filter((obj) => obj.id === name);
      if (!(itemSaved[0].quantity)) {
        itemSaved[0].quantity = 1;
        return this.setState((prev) => ({
          savedItems: [...prev.savedItems, itemSaved[0]],
        }));
      }
      itemSaved[0].quantity += 1;
      this.setState((prev) => ({
        savedItems: [...prev.savedItems, itemSaved[0]],
      }));
      return;
    }
    const searchSaved = items.results.filter((obj) => obj.id === name);
    this.setState((prev) => ({
      savedItems: [...prev.savedItems, searchSaved[0]],
    }));
  };

  onBtnClick = async () => {
    const { searchText } = this.state;
    const searchedItems = await getProductsFromCategoryAndQuery('', searchText);
    if (searchedItems.results.length === 0) {
      return this.setState({ searchText: '', nothing: 'Nenhum produto foi encontrado' });
    }
    this.setState({ searchText: '', items: searchedItems });
  };

  onInputChange = (event) => {
    this.setState({
      searchText: event.target.value,
    });
  };

  categorySearchItems = async ({ target }) => {
    const { name } = target;
    const foundItems = await getProductsFromCategoryAndQuery(name.toString());
    this.setState({ items: [], categorySearch: foundItems });
  };

  render() {
    const { history } = this.props;
    const { categories, searchText, items, nothing, categorySearch } = this.state;
    const { results } = items;
    let { results: resul } = categorySearch;
    if (!resul) resul = [];
    return (
      <section>
        <Header history={ history } />
        <div>
          { categories.map((obj) => (
            <button
              onClick={ this.categorySearchItems }
              name={ obj.id }
              type="button"
              key={ obj.id }
              data-testid="category"
            >
              { obj.name }
            </button>
          )) }
        </div>
        <input
          data-testid="query-input"
          type="text"
          name="search"
          onChange={ this.onInputChange }
          value={ searchText }
        />
        <button
          data-testid="query-button"
          type="button"
          onClick={ this.onBtnClick }
        >
          Buscar
        </button>
        {
          (items.length === 0)
            ? (
              <p
                data-testid="home-initial-message"
              >
                Digite algum termo de pesquisa ou escolha uma categoria.

              </p>
            )
            : (
              <div className="itemDiv">
                {results.map((obj) => (
                  <div
                    key={ obj.id }
                    data-testid="product"
                    className="item"
                  >
                    <Link
                      data-testid="product-detail-link"
                      to={ `/products/${obj.id}` }
                    >
                      <img src={ obj.thumbnail } alt={ obj.title } />
                      <h3>{ obj.title }</h3>
                      <h2>{ `R$ ${obj.price.toFixed(2)}` }</h2>
                    </Link>
                    <button
                      data-testid="product-add-to-cart"
                      onClick={ this.btnCartClick }
                      name={ obj.id }
                      type="button"
                    >
                      Adicionar ao carrinho
                    </button>
                  </div>
                ))}
              </div>
            )
        }
        { resul.length > 0
          && (
            <div className="itemDiv">
              { resul.map((obj) => (
                <div data-testid="product" className="item" key={ obj.id }>
                  <Link
                    data-testid="product-detail-link"
                    to={ `/products/${obj.id}` }
                  >
                    <img src={ obj.thumbnail } alt={ obj.title } />
                    <h3>{ obj.title }</h3>
                    <h2>{ `R$ ${obj.price.toFixed(2)}` }</h2>
                  </Link>
                  <button
                    data-testid="product-add-to-cart"
                    name={ obj.id }
                    onClick={ this.btnCartClick }
                    type="button"
                  >
                    Adicionar ao carrinho
                  </button>
                </div>
              ))}
            </div>
          )}
        { nothing !== '' && <h3>{ nothing }</h3> }
      </section>
    );
  }
}

Home.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default Home;
