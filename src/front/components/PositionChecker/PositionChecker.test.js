import * as DataContextModule from '@contexts/DataContext';
import { dataAllUpright, dataWithKnockedOverAndNull } from '@fixtures/molkky';
import MessageIcon from '@components/MessageIcon';
import PositionChecker from './index';
import React from 'react';
import SkittlesDisplay from '@components/SkittlesDisplay';
import { shallow } from 'enzyme';

const { DataContextProvider } = DataContextModule;

describe('PositionChecker', () => {
  let useDataContextSpy;
  afterEach(() => {
    useDataContextSpy.mockClear();
  });

  afterAll(() => {
    useDataContextSpy.mockRestore();
  });

  it('should render the component correctly when all pins are upright', () => {
    // Given
    useDataContextSpy = jest.spyOn(DataContextModule, 'useDataContext').mockReturnValue(dataAllUpright);

    // When
    const wrapper = shallow(<DataContextProvider><PositionChecker /></DataContextProvider>).dive();

    // Then
    expect(wrapper.find('p')).toHaveLength(1);
    expect(wrapper.find(SkittlesDisplay)).toHaveLength(1);
    expect(wrapper.find(MessageIcon)).toHaveLength(0);
  });

  it('should render the component correctly when some pins are knocked over and some are null', () => {
    // Given
    useDataContextSpy = jest.spyOn(DataContextModule, 'useDataContext').mockReturnValue(dataWithKnockedOverAndNull);

    // When
    const wrapper = shallow(<DataContextProvider><PositionChecker /></DataContextProvider>).dive();

    // Then
    expect(wrapper.find('p')).toHaveLength(1);
    expect(wrapper.find(SkittlesDisplay)).toHaveLength(1);
    expect(wrapper.find(MessageIcon)).toHaveLength(2);
    const lists = wrapper.find('ul');
    expect(lists).toHaveLength(2);
    expect(lists.at(0).find('li')).toHaveLength(2);
    expect(lists.at(0).find('li').map((li) => li.props().children)).toStrictEqual([2, 4]);
    expect(lists.at(1).find('li')).toHaveLength(3);
    expect(lists.at(1).find('li').map((li) => li.props().children)).toStrictEqual([1, 5, 6]);
  });

  it('should render an error message if there is no data', () => {
    // Given
    useDataContextSpy = jest.spyOn(DataContextModule, 'useDataContext').mockReturnValue([]);

    // When
    const wrapper = shallow(<DataContextProvider><PositionChecker /></DataContextProvider>).dive();

    // Then
    expect(wrapper.find(MessageIcon)).toHaveLength(1);
    expect(wrapper.find(MessageIcon).props().type).toBe('error');
  });
});
