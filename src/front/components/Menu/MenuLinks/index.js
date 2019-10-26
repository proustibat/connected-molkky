import React from 'react';
import PropTypes from 'prop-types';

const MenuLinks = ({ id, className }) => (
  <ul id={id} className={className}>
    <li><a href="/">Link 1</a></li>
    <li><a href="/">Link 2</a></li>
  </ul>
);

MenuLinks.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
};

MenuLinks.defaultProps = {
  id: '',
  className: '',
};

export default MenuLinks;
