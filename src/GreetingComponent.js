// GreetingComponent.js

import React from 'react';

// Functional component using arrow function
const GreetingComponent = ({ name }) => {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>Welcome to the world of React.</p>
    </div>
  );
};

export default GreetingComponent;

