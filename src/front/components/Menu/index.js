import React, { useEffect } from 'react';
import MenuLinks from '@components/Menu/MenuLinks';
import PropTypes from 'prop-types';

const Menu = ({ title }) => {
  useEffect(() => {
    // Mobile menu initialization
    const { M: MaterializeCSS } = window;
    MaterializeCSS && MaterializeCSS.Sidenav.init(document.querySelectorAll('.sidenav'), { edge: 'right' });
  }, []);

  return (
    <div className="navbar-fixed">
      <nav>
        <div className="container nav-wrapper">
          <a href="/molkky/game" className="brand-logo left">{title}</a>
          <a href="/molkky/game" data-target="mobile-menu" className="sidenav-trigger right"><i className="material-icons">menu</i></a>
          <MenuLinks className="right hide-on-med-and-down" />
        </div>
      </nav>
      <MenuLinks id="mobile-menu" className="sidenav right" />
    </div>
  );
};

Menu.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Menu;
