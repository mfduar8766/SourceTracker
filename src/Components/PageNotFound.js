import React from 'react';
import { Link } from 'react-router-dom';
const PageNotFound = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    Oops... Looks like this page does not exist.
    <Link to="/">Click here to go back to the home page.</Link>
  </div>
);

export default PageNotFound;
