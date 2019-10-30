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

  it('should inherit style', () => {
    // Given / When
    const style = { background: 'red' };
    const component = shallow(<LoadingBar style={style} />);

    // Then
    expect(component.props().style).toMatchObject(style);
  });

  it('should inherit progress bar style', () => {
    // Given / When
    const style = { background: 'red' };
    const component = shallow(<LoadingBar progressBarStyle={style} />);

    // Then
    expect(component.find('.progress').props().style).toMatchObject(style);
  });
});
