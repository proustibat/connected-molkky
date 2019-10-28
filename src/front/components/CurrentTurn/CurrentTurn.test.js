import * as DataContextModule from '@contexts/DataContext';
import * as PlayContextModule from '@contexts/PlayContext';
import * as Services from '@utils/services';
import Button from '@components/Button';
import CatSVG from '@root/front/svg/cat.svg';
import CurrentTurn from './index';
import DogSVG from '@root/front/svg/dog.svg';
import React from 'react';
import SkittlesDisplay from '@components/SkittlesDisplay';
import constants from '@utils/constants';
import { mount } from 'enzyme';

const givenProps = {};

describe('CurrentTurn', () => {
  let usePlayContextSpy;
  let useDataContextSpy;
  let calculatePointsSpy;
  let consoleSpy;

  beforeAll(() => {
    consoleSpy = jest.spyOn(window.console, 'log');
    usePlayContextSpy = jest.spyOn(PlayContextModule, 'usePlayContext').mockReturnValue({
      teams: {
        cat: { name: 'cat team', icon: CatSVG },
        dog: { name: 'dog team', icon: DogSVG },
      },
      currentTurn: {
        isPlaying: 'dog',
      },
    });
    useDataContextSpy = jest.spyOn(DataContextModule, 'useDataContext').mockReturnValue({
      positionData: [
        { value: 1, position: constants.POSITION.UPRIGHT },
        { value: 2, position: constants.POSITION.UPRIGHT },
        { value: 3, position: constants.POSITION.UPRIGHT },
        { value: 4, position: constants.POSITION.UPRIGHT },
        { value: 5, position: constants.POSITION.UPRIGHT },
        { value: 6, position: constants.POSITION.KNOCKED_OVER },
        { value: 7, position: constants.POSITION.UPRIGHT },
        { value: 8, position: constants.POSITION.UPRIGHT },
        { value: 9, position: constants.POSITION.UPRIGHT },
        { value: 10, position: constants.POSITION.UPRIGHT },
        { value: 11, position: constants.POSITION.UPRIGHT },
        { value: 12, position: constants.POSITION.UPRIGHT },
      ],
      serverIsRunning: false,
      createFakeServer: () => {},
      destroyFakeServer: () => {},
    });
    calculatePointsSpy = jest.spyOn(Services, 'calculatePoints').mockReturnValue(6);
  });

  beforeEach(() => {
  });

  afterEach(() => {
    usePlayContextSpy.mockClear();
    useDataContextSpy.mockClear();
    calculatePointsSpy.mockClear();
    consoleSpy.mockClear();
  });

  afterAll(() => {
    usePlayContextSpy.mockRestore();
    useDataContextSpy.mockRestore();
    calculatePointsSpy.mockRestore();
    consoleSpy.mockRestore();
  });

  it('should render the component correctly', () => {
    // Given / When
    const component = mount(<CurrentTurn {...givenProps} />);

    // Then
    expect(component).toHaveLength(1);
    expect(component.find('h1')).toHaveLength(1);
    expect(component.find('h1').find('span')).toHaveLength(3);
    expect(component.find('h1').find('span').at(1).find(DogSVG)).toHaveLength(1);
    expect(component.find('h1').find('span').at(2).text()).toBe('dog team');
    expect(component.find(SkittlesDisplay)).toHaveLength(1);
    expect(component.find(Button)).toHaveLength(3);
    expect(component.find(Button).at(0).find('i')).toHaveLength(1);
    expect(component.find(Button).at(0).find('i').text()).toBe('edit');
    expect(component.find(Button).at(1).find('i')).toHaveLength(1);
    expect(component.find(Button).at(1).find('i').text()).toBe('highlight_off');
    expect(component.find(Button).at(2).find('i')).toHaveLength(1);
    expect(component.find(Button).at(2).find('i').text()).toBe('done');
  });

  it('should request calculate points on mount', () => {
    // Given / When
    const component = mount(<CurrentTurn {...givenProps} />);

    // Then
    expect(calculatePointsSpy).toHaveBeenCalledTimes(1);
    expect(component.find('.row .s6 .s12 span').text()).toBe('6');
  });

  it('should handle click on edit', () => {
    // Given
    const component = mount(<CurrentTurn {...givenProps} />);

    // When
    component.find(Button).at(0).find('i').simulate('click');

    // Then
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenLastCalledWith('onEditClick');
  });

  it('should handle click on miss target button', () => {
    // Given
    const component = mount(<CurrentTurn {...givenProps} />);

    // When
    component.find(Button).at(1).find('i').simulate('click');

    // Then
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenLastCalledWith('onMissTargetClick');
  });

  it('should handle click on valid score button', () => {
    // Given
    const component = mount(<CurrentTurn {...givenProps} />);

    // When
    component.find(Button).at(2).find('i').simulate('click');

    // Then
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenLastCalledWith('onValidScoreClick');
  });
});
