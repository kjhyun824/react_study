// Import the React and ReactDOM libraries
import React from 'react';
import ReactDOM from 'react-dom';

function getButtonText() {
    return 'Click Me Now!'
}

// Create React component
const App = function () {
    const button_name = 'Click Me!';
    const button_style = { 
        backgroundColor: 'blue', 
        color: 'white' 
    };

    return <div>
        <label className="label" htmlFor="name">
            Enter name:
        </label>
        <input id="name" type="text" />
        <button style={button_style}>
            {button_name}
        </button>
    </div>;
};


// Take the React component and show it on the screen
ReactDOM.render( 
    <App />,
    document.querySelector('#root')
);