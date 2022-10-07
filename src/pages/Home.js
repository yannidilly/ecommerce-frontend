import React from 'react';

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
    const { searchText } = this.state;
    return (
      <section>
        <h1>HOME</h1>
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

export default Home;
