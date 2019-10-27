import Darksky from './index';
import React from 'react';
import { initProps } from '@fixtures/darksky';
import { shallow } from 'enzyme';

describe('Page Darksky', () => {
  it('should render the page correctly', () => {
    // Given / When
    const component = shallow(<Darksky {...initProps} />);

    // Then
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });
});
