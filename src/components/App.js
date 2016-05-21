import React, { PropTypes } from 'react';
import Header from './header';
import Nav from './nav';
const App = (props) => {
  return (
    <div>
      <Header/>
      <Nav/>
      <div className="container">
        {props.children}
      </div>
    </div>
  );
};
// <IndexLink to="/">Home</IndexLink>
// {' | '}
// <Link to="/fuel-savings">Example App</Link>
// {' | '}
// <Link to="/about">About</Link>
// <br/>
App.propTypes = {
  children: PropTypes.element
};

export default App;
