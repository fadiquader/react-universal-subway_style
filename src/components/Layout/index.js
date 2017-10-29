import React from 'react';
import Header from '../Header';

const Layout = ({ children }) => (
  <div>
    <Header />
    <div>
      layout
    </div>
    { children }
  </div>
);

export default Layout;
