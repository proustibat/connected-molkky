import MenuLinks from './index';
import React from 'react';
import { shallow } from 'enzyme';

describe('MenuLinks', () => {
  it('should render the component correctly', () => {
    // Given / When
    const component = shallow(<MenuLinks />);

    // Then
    expect(component).toHaveLength(1);
    expect(component.find('ul')).toHaveLength(1);
    expect(component.find('a')).toHaveLength(2);
  });

  it('should inherit classname and id', () => {
    // Given / When
    const [id, className] = ['my-id', 'my-class'];
    const component = shallow(<MenuLinks {...{ id, className }} />);

    // Then
    expect(component.props().id).toBe(id);
    expect(component.props().className).toBe(className);
  });
});
