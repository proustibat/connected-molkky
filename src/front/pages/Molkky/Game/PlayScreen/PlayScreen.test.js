import CurrentTurn from '@components/CurrentTurn';
import PlayScreen from './index';
import React from 'react';
import ScoresOverview from '@components/ScoresOverview';
import { shallow } from 'enzyme';

describe('PlayScreen', () => {
  it('should render the component correctly', () => {
    // Given / When
    const component = shallow(<PlayScreen />);

    // Then
    expect(component).toHaveLength(1);
    expect(component.find(ScoresOverview)).toHaveLength(1);
    expect(component.find(CurrentTurn)).toHaveLength(1);
  });
});
