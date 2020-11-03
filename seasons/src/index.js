import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { latitude: null, error_message: '' };
  }

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      (position) => this.setState({ latitude: position.coords.latitude }),
      (err) => this.setState({ error_message: err.message }),
    );
  }

  renderContent() {
    if (this.state.error_message && !this.state.latitude) {
      return <div>Error: {this.state.error_message}</div>;
    }

    if (!this.state.error_message && this.state.latitude) {
      return (
        <div>
          <SeasonDisplay latitude={this.state.latitude} />
        </div>
      );
    }

    return <Spinner message="Please accept location request" />;
  }

  render() {
    return <div className="border red">{this.renderContent()}</div>;
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
