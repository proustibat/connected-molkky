import React from 'react';
import { shallow } from 'enzyme';
import Skittle from '@components/Skittle';
import * as DataContextModule from '@contexts/DataContext';
import { dataWithKnockedOverAndNull } from '@fixtures/molkky';
import constants from '@utils/constants';
import SkittlesDisplay from './index';

const { DataContextProvider } = DataContextModule;

describe('SkittlesDisplay', () => {
  let useDataContextSpy;
  afterEach(() => {
    useDataContextSpy.mockClear();
  });

  afterAll(() => {
    useDataContextSpy.mockRestore();
  });

  it('should render the component correctly with no data', () => {
    // Given
    useDataContextSpy = jest.spyOn(DataContextModule, 'useDataContext').mockReturnValue([]);

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
    useDataContextSpy = jest.spyOn(DataContextModule, 'useDataContext').mockReturnValue(dataWithKnockedOverAndNull);

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
});
