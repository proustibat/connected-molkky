import React from 'react';
import { shallow } from 'enzyme';
import Home from './index';
import Link from '../../components/Link';

describe('Page Home', () => {
  it('should render the page correctly with a title', () => {
    // Given // When
    const title = 'Sunday Kind Of Love';
    const component = shallow(<Home title={title} />);

    // Then
    expect(component).toHaveLength(1);
    expect(component.find('h1')).toHaveLength(1);
    expect(component.find('h1').text()).toBe(title);
    expect(component.find(Link)).toHaveLength(2);
  });

  it('should render the page correctly without a title', () => {
    // Given // When
    const component = shallow(<Home />);

    // Then
    expect(component).toHaveLength(1);
    expect(component.find('h1')).toHaveLength(0);
    expect(component.find(Link)).toHaveLength(2);
  });
});
