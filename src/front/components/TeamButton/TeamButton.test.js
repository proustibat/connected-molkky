import React from 'react';
import { shallow } from 'enzyme';
import CatSvg from '@root/front/svg/cat.svg';
import TeamButton from './index';

const givenProps = {
  icon: CatSvg,
  value: 'cat',
  onClick: () => {},
};

describe('TeamButton', () => {
  it('should render the component correctly', () => {
    // Given / When
    const component = shallow(<TeamButton {...givenProps} />);

    // Then
    expect(component).toHaveLength(1);
    expect(component.find('button')).toHaveLength(1);
    expect(component.find('button').props().className).toContain('z-depth-1');
    expect(component.find(CatSvg)).toHaveLength(1);
    expect(component.find('p')).toHaveLength(0);
  });

  it('should render the team name correctly', () => {
    // Given / When
    const teamName = 'Team cat';
    const component = shallow(<TeamButton {...givenProps} name={teamName} />);

    // Then
    expect(component.find('p')).toHaveLength(1);
    expect(component.find('p').first().text()).toBe(teamName);
  });

  it('should change style when selected prop changes', () => {
    // Given
    const component = shallow(<TeamButton {...givenProps} />);
    const styleUnselected = component.find('button').props().style;

    // When
    component.setProps({ selected: true });

    // Then
    expect(component.find('button').props().className).toContain('z-depth-4');
    expect(styleUnselected).not.toMatchObject(component.find('button').props().style);
  });

  it('should inherit style', () => {
    // Given / When
    const customStyle = { background: 'red' };
    const component = shallow(<TeamButton {...givenProps} style={customStyle} />);

    // Then
    expect(component.find('button').props().style).toMatchObject(customStyle);
  });

  it('should handle click', () => {
    // Given
    const onClickSpy = jest.fn();
    const component = shallow(<TeamButton {...givenProps} onClick={onClickSpy} />);

    // When
    component.find('button').simulate('click');

    // Then
    expect(onClickSpy).toHaveBeenCalledTimes(1);
    expect(onClickSpy).toHaveBeenLastCalledWith(givenProps.value);
  });
});
