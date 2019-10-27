import Button from './index';
import React from 'react';
import { shallow } from 'enzyme';

describe('Button', () => {
  it('should render the component correctly when it is enabled', () => {
    // Given / When
    const component = shallow(<Button onClick={() => {}}>click me</Button>);

    // Then
    expect(component).toMatchSnapshot();
  });

  it('should render the component correctly when it is disabled', () => {
    // Given / When
    const component = shallow(<Button onClick={() => {}} disabled>click me</Button>);

    // Then
    expect(component).toMatchSnapshot();
  });

  it('should inherit style', () => {
    // Given / When
    const style = { color: 'blue', width: 'auto', margin: 0 };
    const component = shallow(<Button onClick={() => {}} style={style}>click me</Button>);

    // Then
    expect(component.find('button').props().style).toMatchObject(style);
  });

  it('should handle click', () => {
    // Given / When
    const onClick = jest.fn();
    const component = shallow(<Button onClick={onClick}>click me</Button>);

    // When
    component.simulate('click');

    // Then
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
