import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getProductsFromCategoryAndQuery } from '../services/api';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      searchText: '',
      items: [],
      nothing: '',
    };
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

  render() {
    const { history } = this.props;
    const { searchText, items, nothing } = this.state;
    const { results } = items;
    return (
      <section>
        <Header history={ history } />
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
                  <div data-testid="product" className="item" key={ obj.id }>
                    <img src={ obj.thumbnail } alt={ obj.title } />
                    <h3>{ obj.title }</h3>
                    <h2>{ Number(obj.price.toFixed(2)) }</h2>
                  </div>
                ))}
              </div>
            )
        }
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
