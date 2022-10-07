import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      searchText: '',
    };
  }

  onInputChange = (event) => {
    this.setState({
      searchText: event.target.value,
    });
  };

  render() {
    const { history } = this.props;
    const { searchText } = this.state;
    return (
      <section>
        <Header history={ history } />
        <input
          type="text"
          name="search"
          onChange={ this.onInputChange }
        />
        {
          (searchText.length === 0)
            ? (
              <p
                data-testid="home-initial-message"
              >
                Digite algum termo de pesquisa ou escolha uma categoria.

              </p>
            ) : null
        }
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
