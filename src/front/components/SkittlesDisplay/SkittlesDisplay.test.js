import * as DataContextModule from '@contexts/DataContext';
import { mount, shallow } from 'enzyme';
import React from 'react';
import Skittle from '@components/Skittle';
import SkittlesDisplay from './index';
import constants from '@utils/constants';
import { dataWithKnockedOverAndNull } from '@fixtures/molkky';

const { DataContextProvider } = DataContextModule;

describe('SkittlesDisplay', () => {
  let useDataContextSpy;

  beforeEach(() => {
    useDataContextSpy = jest.spyOn(DataContextModule, 'useDataContext');
  });

  afterEach(() => {
    useDataContextSpy.mockClear();
  });

  afterAll(() => {
    useDataContextSpy.mockRestore();
  });

  it('should render the component correctly with no data', () => {
    // Given
    useDataContextSpy = jest.spyOn(DataContextModule, 'useDataContext').mockReturnValue({ positionData: [] });

    // When
    const component = shallow(
      <DataContextProvider><SkittlesDisplay /></DataContextProvider>,
    ).dive();

    // Then
    expect(component).toHaveLength(1);
    expect(component.find(Skittle)).toHaveLength(12);
    expect(component.find('div')).toHaveLength(5);
    expect(component.find('div').at(1).find(Skittle)).toHaveLength(3);
    expect(component.find('div').at(2).find(Skittle)).toHaveLength(4);
    expect(component.find('div').at(3).find(Skittle)).toHaveLength(3);
    expect(component.find('div').at(4).find(Skittle)).toHaveLength(2);
    expect(component
      .find(Skittle)
      .map((skittle) => skittle.props().position)
      .every((pos) => pos === null)).toBeTruthy();
  });

  it('should render the component correctly with data', () => {
    // Given
    useDataContextSpy = jest.spyOn(DataContextModule, 'useDataContext').mockReturnValue({ positionData: dataWithKnockedOverAndNull });

    // When
    const component = shallow(
      <DataContextProvider><SkittlesDisplay /></DataContextProvider>,
    ).dive();

    // Then
    expect(component).toHaveLength(1);
    expect(component.find(Skittle)).toHaveLength(12);
    expect(component.find('div')).toHaveLength(5);
    expect(component.find('div').at(1).find(Skittle)).toHaveLength(3);
    expect(component.find('div').at(2).find(Skittle)).toHaveLength(4);
    expect(component.find('div').at(3).find(Skittle)).toHaveLength(3);
    expect(component.find('div').at(4).find(Skittle)).toHaveLength(2);
    expect(component
      .find(Skittle)
      .map((skittle) => skittle.props())
      .filter((props) => [1, 5, 6].includes(props.value))
      .every(({ position }) => position === null)).toBeTruthy();
    expect(component
      .find(Skittle)
      .map((skittle) => skittle.props())
      .filter((props) => [2, 4].includes(props.value))
      .every(({ position }) => position === constants.POSITION.KNOCKED_OVER)).toBeTruthy();
    expect(component
      .find(Skittle)
      .map((skittle) => skittle.props())
      .filter((props) => [3, 7, 8, 9, 10, 11, 12].includes(props.value))
      .every(({ position }) => position === constants.POSITION.UPRIGHT)).toBeTruthy();
  });

  it('should render the component correctly in edit mode', () => {
    // Given /  When
    const component = shallow(<SkittlesDisplay editMode />);

    // Then
    expect(component
      .find(Skittle)
      .map((skittle) => skittle.props())
      .every(({ position }) => position === constants.POSITION.UPRIGHT)).toBeTruthy();
  });

  it('should render the component correctly in edit mode and skittles in prop', () => {
    // Given / When
    const skittles = Array.from({ length: 12 },
      (position = constants.POSITION.UPRIGHT, value) => ({ value: value + 1, position }));
    skittles[2] = { value: 3, position: constants.POSITION.KNOCKED_OVER };
    const component = mount(<SkittlesDisplay editMode skittles={skittles} />);

    // Then
    expect(component
      .find(Skittle)
      .map((skittle) => skittle.props())
      .filter((props) => ![3].includes(props.value))
      .every(({ position }) => position === constants.POSITION.UPRIGHT)).toBeTruthy();

    expect(component
      .find(Skittle)
      .map((skittle) => skittle.props())
      .filter((props) => [3].includes(props.value))
      .every(({ position }) => position === constants.POSITION.KNOCKED_OVER)).toBeTruthy();
  });

  it('should select a skittle in edit mode', () => {
    // Given
    const skittles = Array.from({ length: 12 },
      (position = constants.POSITION.UPRIGHT, value) => ({ value: value + 1, position }));
    skittles[2] = { value: 3, position: constants.POSITION.KNOCKED_OVER };
    const onChangeSpy = jest.fn();
    const component = mount(<SkittlesDisplay
      editMode
      skittles={skittles}
      onChange={onChangeSpy}
    />);
    onChangeSpy.mockReset();

    // When
    component
      .find(Skittle)
      .map((skittle) => skittle.props())
      .find((props) => props.value === 8)
      .onClick(8);

    // Then
    expect(onChangeSpy).toHaveBeenCalledTimes(1);
    const expectedData = [...skittles];
    expectedData[7] = { value: 8, position: constants.POSITION.KNOCKED_OVER };
    expect(onChangeSpy).toHaveBeenLastCalledWith(expectedData);
  });

  it('should unselect a skittle in edit mode', () => {
    // Given
    const skittles = Array.from({ length: 12 },
      (position = constants.POSITION.UPRIGHT, value) => ({ value: value + 1, position }));
    skittles[2] = { value: 3, position: constants.POSITION.KNOCKED_OVER };
    const onChangeSpy = jest.fn();
    const component = mount(<SkittlesDisplay
      editMode
      skittles={skittles}
      onChange={onChangeSpy}
    />);
    onChangeSpy.mockReset();

    // When
    component
      .find(Skittle)
      .map((skittle) => skittle.props())
      .find((props) => props.value === 3)
      .onClick(3);

    // Then
    expect(onChangeSpy).toHaveBeenCalledTimes(1);
    const expectedData = [...skittles];
    expectedData[2] = { value: 3, position: constants.POSITION.UPRIGHT };
    expect(onChangeSpy).toHaveBeenLastCalledWith(expectedData);
  });
});
