import { shallow, mount } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Button from '@components/Button';
import PositionChecker from '@components/PositionChecker';
import TeamButton from '@components/TeamButton';
import { DataContextProvider } from '@contexts/DataContext';
import constants from '@utils/constants';
import * as services from '@utils/services';
import StartScreen from './index';

jest.mock('react-router-dom', () => ({ useHistory: () => ({ push: jest.fn() }) }));

const givenProps = {
  title: 'Game',
};

describe('StartScreen', () => {
  beforeAll(() => {
    jest.spyOn(services, 'getRandomPositionData').mockReturnValue(Array.from({ length: 12 }, (_, i) => ({
      value: i + 1,
      position: constants.POSITION.UPRIGHT,
    })));
  });

  afterEach(() => {
    services.getRandomPositionData.mockClear();
    cleanup();
  });

  afterAll(() => {
    services.getRandomPositionData.mockRestore();
    jest.restoreAllMocks();
    jest.resetModules();
  });

  it('should render the component correctly', () => {
    // Given / When
    const component = shallow(<StartScreen {...givenProps} />);

    // Then
    expect(component).toHaveLength(1);
    expect(component.find(DataContextProvider)).toHaveLength(1);
    expect(component.find('h1')).toHaveLength(2);
    expect(component.find(PositionChecker)).toHaveLength(1);
    expect(component.find(TeamButton)).toHaveLength(2);
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

  it('should enable play button', () => {
    // Given / When
    jest.useFakeTimers();
    let component;
    act(() => {
      component = render(<StartScreen {...givenProps} />);
      jest.advanceTimersByTime(3000);
    });

    // Then
    expect(component.getByText('Play').classList.contains('disabled')).toBeFalsy();
    jest.clearAllTimers();
  });

  it('should handle team selection', () => {
    // Given
    jest.useFakeTimers();
    let component;
    act(() => {
      component = render(<StartScreen {...givenProps} />);
      jest.advanceTimersByTime(3000);
    });

    // When
    act(() => {
      fireEvent.click(component.getByText('Team Dog'));
    });

    // Then
    expect(component.getByText('Team Dog').closest('button').classList.contains('z-depth-4')).toBeTruthy();
    jest.clearAllTimers();
  });

  it('should handle click on play button', () => {
    // Given / When
    jest.useFakeTimers();
    let component;
    act(() => {
      component = render(<StartScreen {...givenProps} />);
      jest.advanceTimersByTime(3000);
    });

    // When
    act(() => {
      fireEvent.click(component.getByText('Play'));
    });

    // Then
    expect(clearInterval).toHaveBeenCalledTimes(1);
    jest.clearAllTimers();
  });
});
