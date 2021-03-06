import * as DataContextModule from '@contexts/DataContext';
import * as PlayContextModule from '@contexts/PlayContext';
import * as Services from '@utils';
import Button from '@components/Button';
import CatSVG from '@root/front/svg/cat.svg';
import CurrentTurn from './index';
import DogSVG from '@root/front/svg/dog.svg';
import { POSITION } from '@utils/constants';
import React from 'react';
import SkittlesDisplay from '@components/SkittlesDisplay';
import { mount } from 'enzyme';

describe('CurrentTurn', () => {
  let usePlayContextSpy;
  let useDataContextSpy;
  let calculatePointsSpy;
  let givenProps;

  beforeAll(() => {
    usePlayContextSpy = jest.spyOn(PlayContextModule, 'usePlayContext').mockReturnValue({
      teams: {
        cat: { name: 'cat team', icon: CatSVG },
        dog: { name: 'dog team', icon: DogSVG },
      },
      currentTurn: { isPlaying: 'dog' },
    });

    useDataContextSpy = jest.spyOn(DataContextModule, 'useDataContext').mockReturnValue({
      positionData: [
        { value: 1, position: POSITION.UPRIGHT },
        { value: 2, position: POSITION.UPRIGHT },
        { value: 3, position: POSITION.UPRIGHT },
        { value: 4, position: POSITION.UPRIGHT },
        { value: 5, position: POSITION.UPRIGHT },
        { value: 6, position: POSITION.KNOCKED_OVER },
        { value: 7, position: POSITION.UPRIGHT },
        { value: 8, position: POSITION.UPRIGHT },
        { value: 9, position: POSITION.UPRIGHT },
        { value: 10, position: POSITION.UPRIGHT },
        { value: 11, position: POSITION.UPRIGHT },
        { value: 12, position: POSITION.UPRIGHT },
      ],
    });

    calculatePointsSpy = jest.spyOn(Services, 'calculatePoints').mockReturnValue(6);

    givenProps = {
      onValid: jest.fn(),
      onMiss: jest.fn(),
      onEdit: jest.fn(),
    };
  });

  afterEach(() => {
    usePlayContextSpy.mockClear();
    useDataContextSpy.mockClear();
    calculatePointsSpy.mockClear();
    givenProps.onValid.mockClear();
    givenProps.onMiss.mockClear();
    givenProps.onEdit.mockClear();
  });

  afterAll(() => {
    usePlayContextSpy.mockRestore();
    useDataContextSpy.mockRestore();
    calculatePointsSpy.mockRestore();
    givenProps.onValid.mockRestore();
    givenProps.onMiss.mockRestore();
    givenProps.onEdit.mockRestore();
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
    expect(component.find('#points').text()).toBe('6');
  });

  it('should handle click on edit', () => {
    // Given
    const component = mount(<CurrentTurn {...givenProps} />);

    // When
    component.find(Button).at(0).find('i').simulate('click');

    // Then
    expect(givenProps.onEdit).toHaveBeenCalledTimes(1);
  });

  it('should handle click on miss target button', () => {
    // Given
    const component = mount(<CurrentTurn {...givenProps} />);

    // When
    component.find(Button).at(1).find('i').simulate('click');

    // Then
    expect(givenProps.onMiss).toHaveBeenCalledTimes(1);
  });

  it('should handle click on valid score button', () => {
    // Given
    const component = mount(<CurrentTurn {...givenProps} />);

    // When
    component.find(Button).at(2).find('i').simulate('click');

    // Then
    expect(givenProps.onValid).toHaveBeenLastCalledWith(6);
  });

  it('should disable buttons', () => {
    // Given / When
    const component = mount(<CurrentTurn {...givenProps} disabled />);

    // Then
    expect(component
      .find(Button)
      .map((btn) => btn.props().className)
      .every((className) => className.split(' ').includes('disabled'))).toBeTruthy();
  });
});
