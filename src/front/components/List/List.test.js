import React from 'react';
import { shallow } from 'enzyme';
import List from './index';

const givenProps = {
  elements: [
    'Nat King Cole',
    'Peggy Lee',
    'Ella Fitzgerald',
  ],
};

describe('LoadingBar', () => {
  it('should render the component correctly with no title', () => {
    // Given / When
    const component = shallow(<List {...givenProps} />);

    // Then
    expect(component).toHaveLength(1);
    expect(component.find('ul')).toHaveLength(1);
    expect(component.find('ul').props().className).toBe('collection');
    expect(component.find('li')).toHaveLength(givenProps.elements.length);
    expect(component.find('li').map((li) => li.props().children)).toStrictEqual(givenProps.elements);
    expect(component.find('li').map((li) => li.props().className).every((cs) => cs === 'collection-item')).toBeTruthy();
  });

  it('should render the component correctly with a title', () => {
    // Given / When
    const title = 'Jazz artists';
    const component = shallow(<List {...givenProps} title={title} />);

    // Then
    expect(component.find('li')).toHaveLength(givenProps.elements.length + 1);
    expect(component.find('li').first().find('p')).toHaveLength(1);
    expect(component.find('li').first().find('p').props().children).toBe(title);
  });
});
