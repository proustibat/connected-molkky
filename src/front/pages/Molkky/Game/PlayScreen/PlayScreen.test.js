import React from 'react';
import { shallow } from 'enzyme';
import PlayScreen from './index';

describe('PlayScreen', () => {
  it('should render the component correctly', () => {
    // Given / When
    const component = shallow(<PlayScreen />);

    // Then
    expect(component).toHaveLength(1);
    expect(component.find('h1')).toHaveLength(1);
  });
});
