import Link from './index';
import React from 'react';
import { shallow } from 'enzyme';

describe('Link', () => {
  it('should render component correctly', () => {
    // Given
    const href = '/youpi';
    const text = 'Hello World!';

    // When
    const component = shallow(<Link href={href}>{text}</Link>);

    // Then
    expect(component).toHaveLength(1);
    expect(component.find('a')).toHaveLength(1);
    expect(component.find('a').props().href).toBe(href);
    expect(component.find('a').text()).toBe(text);
  });
});
