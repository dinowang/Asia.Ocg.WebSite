import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import Header from './header';
import Nav from './nav';
const App = (props) => {
  return (
    <div>
    <Header/>
    <Nav/>

      {props.children}
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
