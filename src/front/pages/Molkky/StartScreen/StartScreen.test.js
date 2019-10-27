import { shallow, mount } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';
import Button from '@components/Button';
import Menu from '@components/Menu';
import PositionChecker from '@components/PositionChecker';
import { DataContextProvider } from '@contexts/DataContext';
import constants from '@utils/constants';
import * as services from '@utils/services';

import StartScreen from './index';

const givenProps = {
  title: 'StartScreen',
};

describe('StartScreen', () => {
  beforeAll(() => {
    jest.spyOn(services, 'getRandomPositionData');
    jest.spyOn(services, 'getRandomPosition').mockReturnValue(constants.POSITION.UPRIGHT);
  });

  afterEach(() => {
    services.getRandomPositionData.mockClear();
    services.getRandomPosition.mockClear();
  });

  afterAll(() => {
    services.getRandomPositionData.mockRestore();
    services.getRandomPosition.mockRestore();
  });

  it('should render the component correctly', () => {
    // Given / When
    const component = shallow(<StartScreen {...givenProps} />);

    // Then
    expect(component).toHaveLength(1);
    expect(component.find(DataContextProvider)).toHaveLength(1);
    expect(component.find(Menu)).toHaveLength(1);
    expect(component.find(PositionChecker)).toHaveLength(1);
    expect(component.find(Button)).toHaveLength(1);
    expect(component.find(Button).props().disabled).toBeTruthy();
  });

  it('should get random data on mount', () => {
    // Given
    jest.useFakeTimers();
    let component;
    act(() => { component = mount(<StartScreen {...givenProps} />); });

    // When
    act(() => {
      jest.advanceTimersByTime(9000);
    });

    // Then
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 3000);
    expect(services.getRandomPositionData).toHaveBeenCalledTimes(3);
    expect(component).toMatchSnapshot();

    jest.clearAllTimers();
  });
});
