import React from 'react';
import SVGCircle from './index';
import { shallow } from 'enzyme';


describe('SVGCircle', () => {
  it('should render the component correctly with default props', () => {
    // Given / When
    const component = shallow(<SVGCircle />);

    // Then
    expect(component).toHaveLength(1);
    expect(component.find('svg')).toHaveLength(1);
    expect(component.find('circle')).toHaveLength(1);
    expect(component.find('svg').props().width).toBe(SVGCircle.defaultProps.width);
    expect(component.find('svg').props().height).toBe(SVGCircle.defaultProps.height);
    expect(component.find('circle').props().stroke).toBe(SVGCircle.defaultProps.strokeColor);
    expect(component.find('circle').props().strokeWidth).toBe(SVGCircle.defaultProps.strokeWidth);
    expect(component.find('circle').props().fill).toBe(SVGCircle.defaultProps.fillColor);
  });

  it('should render the component correctly with custom props and a text', () => {
    // Given / When
    const givenProps = {
      width: 20,
      height: 30,
      strokeWidth: 3,
      strokeColor: 'red',
      fillColor: 'black',
      textStyle: { fontFamily: 'serif' },
      textColor: 'blue',
      text: '10',
    };
    const component = shallow(<SVGCircle {...givenProps} />);

    // Then
    expect(component.find('svg').props().width).toBe(givenProps.width);
    expect(component.find('svg').props().height).toBe(givenProps.height);
    expect(component.find('circle').props().stroke).toBe(givenProps.strokeColor);
    expect(component.find('circle').props().strokeWidth).toBe(givenProps.strokeWidth);
    expect(component.find('circle').props().fill).toBe(givenProps.fillColor);
    expect(component.find('text')).toHaveLength(1);
    expect(component.find('text').props().style).toBe(givenProps.textStyle);
    expect(component.find('text').props().fill).toBe(givenProps.textColor);
    expect(component.find('text').props().children).toBe(givenProps.text);
  });
});
