import React from 'react';
import PropTypes from 'prop-types';
import kebabCase from 'lodash/kebabCase';
import defaultStyle from './style.js';

const List = ({title, elements}) => (
    <ul className="collection">
        {title && <li className="collection-header" style={defaultStyle.collectionHeader}><p style={defaultStyle.collectionHeader__content}>{title}</p></li>}
        {elements.map(el => <li key={kebabCase(el)} className="collection-item">{el}</li>)}
    </ul>
);

List.propTypes = {
    title: PropTypes.string,
    elements: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default List;