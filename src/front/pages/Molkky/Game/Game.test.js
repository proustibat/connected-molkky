import React from 'react';
import { shallow, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { DataContextProvider } from '@contexts/DataContext';
import Menu from '@components/Menu';
import PositionChecker from '@components/PositionChecker';
import * as services from '@utils/services';
import constants from '@utils/constants';

import Game from './index';

const givenProps = {
  title: 'Game',
};

describe('Game', () => {
  beforeAll(() => {
    jest.spyOn(services, 'getRandomPosition').mockReturnValue(constants.POSITION.UPRIGHT);
  });

  afterEach(() => {
    services.getRandomPosition.mockClear();
  });

  afterAll(() => {
    services.getRandomPosition.mockRestore();
  });

  it('should render the component correctly', () => {
    // Given / When
    const component = shallow(<Game {...givenProps} />);

    // Then
    expect(component).toHaveLength(1);
    expect(component.find(DataContextProvider)).toHaveLength(1);
    expect(component.find(Menu)).toHaveLength(1);
    expect(component.find(PositionChecker)).toHaveLength(1);
  });

  it('should get random data on mount', () => {
    // Given / When
    let component;
    act(() => { component = mount(<Game {...givenProps} />); });

    // Then
    expect(component).toMatchSnapshot();
  });
});
