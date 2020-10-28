// Import the React and ReactDOM libraries
import React from 'react';
import ReactDOM from 'react-dom';

// Create React component
const App = function () {
    return <div> Hello, World! </div>;
};


// Take the React component and show it on the screen
ReactDOM.render( 
    <App />,
    document.querySelector('#root')
);