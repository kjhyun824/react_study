import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { latitude: null, error_message: '' };

    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({ latitude: position.coords.latitude });
      },
      (err) => {
        this.setState({ error_message: err.message });
      },
    );
  }

  render() {
    if (this.state.error_message && !this.state.latitude) {
      return <div>Error: {this.state.error_message}</div>;
    }

    if (!this.state.error_message && this.state.latitude) {
      return <div>Latitude: {this.state.latitude}</div>;
    }

    return <div>Loading....</div>;
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
