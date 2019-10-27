import { Route, Switch } from 'react-router-dom';
import Game from './index';
import Menu from '@components/Menu';
import React from 'react';
import { shallow } from 'enzyme';

describe('Game', () => {
  it('should render the component correctly', () => {
    // Given / When
    const title = 'yo';
    const component = shallow(<Game title={title} />);

    // Then
    expect(component).toHaveLength(1);
    expect(component.find(Menu)).toHaveLength(1);
    expect(component.find(Menu).props().title).toBe(title);
    expect(component.find(Switch)).toHaveLength(1);
    expect(component.find(Route)).toHaveLength(2);
  });
});
