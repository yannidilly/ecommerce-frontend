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
    };
  }

  async componentDidMount() {
    const cat = await getCategories();
    this.setState({ categories: cat });
  }

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
                  <Link
                    data-testid="product-detail-link"
                    to={ `/products/${obj.id}` }
                    key={ obj.id }
                  >
                    <div data-testid="product" className="item">
                      <img src={ obj.thumbnail } alt={ obj.title } />
                      <h3>{ obj.title }</h3>
                      <h2>{ `R$ ${obj.price.toFixed(2)}` }</h2>
                    </div>
                  </Link>
                ))}
              </div>
            )
        }
        { resul.length > 0
          && (
            <div className="itemDiv">
              { resul.map((obj) => (
                <Link
                  data-testid="product-detail-link"
                  to={ `/products/${obj.id}` }
                  key={ obj.id }
                >
                  <div data-testid="product" className="item" key={ obj.id }>
                    <img src={ obj.thumbnail } alt={ obj.title } />
                    <h3>{ obj.title }</h3>
                    <h2>{ `R$ ${obj.price.toFixed(2)}` }</h2>
                  </div>
                </Link>
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
