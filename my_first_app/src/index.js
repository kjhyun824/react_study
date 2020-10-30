// Import the React and ReactDOM libraries
import React from 'react';
import ReactDOM from 'react-dom';

// Create React component
const App = function () {
    return <div>
        <label class="label" for="name">Enter name:</label>
        <input id="name" type="text" />
        <button style="background-color: blue; color: white;">Submit</button>
    </div>;
};


// Take the React component and show it on the screen
ReactDOM.render( 
    <App />,
    document.querySelector('#root')
);