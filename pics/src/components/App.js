import React from 'react';
//import axios from 'axios';
import unsplash from '../api/unsplash';
import SearchBar from './SearchBar';
class App extends React.Component {
  state = { images: [] };

  /*
  onSearchSubmit = (input) => {
    axios
      .get('https://api.unsplash.com/search/photos', {
        params: {
          query: { input },
        },
        headers: {
          Authorization:
            'Client-ID MIRPPN5Fd40ogaYVEPhZHQAy9mGpAcGLQfyuXY0ip4E',
        },
      })
      .then((response) => {
        console.log(response.data.results);
      })
      .catch((error) => {
        Promise.reject(error);
      });
  };
  */

  onSearchSubmit = async (input) => {
    const response = await unsplash.get('/search/photos', {
      params: {
        query: { input },
      },
    });

    this.setState({ images: response.data.results });
  };

  render() {
    return (
      <div className="ui container" style={{ marginTop: '10px' }}>
        <SearchBar onSubmit={this.onSearchSubmit} />
        {this.state.images.length !== 0 ? (
          <div> Found: {this.state.images.length} images </div>
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default App;
