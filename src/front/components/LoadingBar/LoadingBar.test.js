import LoadingBar from './index';
import React from 'react';
import { shallow } from 'enzyme';

describe('LoadingBar', () => {
  it('should render the component correctly', () => {
    // Given / When
    const component = shallow(<LoadingBar />);

    // Then
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });
});
