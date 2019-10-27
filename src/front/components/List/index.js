import PropTypes from 'prop-types';
import React from 'react';
import defaultStyle from './style';
import kebabCase from 'lodash/kebabCase';

const List = ({ title, elements }) => (
  <ul className="collection">
    {title && <li className="collection-header" style={defaultStyle.collectionHeader}><p style={defaultStyle.collectionHeader__content}>{title}</p></li>}
    {elements.map((el) => <li key={kebabCase(el)} className="collection-item">{el}</li>)}
  </ul>
);

List.propTypes = {
  title: PropTypes.string,
  elements: PropTypes.arrayOf(PropTypes.string).isRequired,
};

List.defaultProps = {
  title: null,
};

export default List;
