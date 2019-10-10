import React from 'react';
import { shallow } from 'enzyme';
import LoadingBar from './index';

describe('LoadingBar', () => {
  it('should render the component correctly', () => {
    // Given / When
    const component = shallow(<LoadingBar />);

    // Then
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });
});
