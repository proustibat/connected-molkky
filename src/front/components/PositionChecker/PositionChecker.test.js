import React from 'react';
import { shallow } from 'enzyme';
import * as DataContextModule from '@contexts/DataContext';
import SkittlesDisplay from '@components/SkittlesDisplay';
import Button from '@components/Button';
import MessageIcon from '@components/MessageIcon';
import { dataAllUpright, dataWithKnockedOverAndNull } from '@fixtures/molkky';
import PositionChecker from './index';

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
    expect(wrapper.find(Button)).toHaveLength(1);
    expect(wrapper.find(Button).props().disabled).toBeFalsy();
  });

  it('should render the component correctly when some pins are knocked over and some are null', () => {
    // Given
    useDataContextSpy = jest.spyOn(DataContextModule, 'useDataContext').mockReturnValue(dataWithKnockedOverAndNull);

    // When
    const wrapper = shallow(<DataContextProvider><PositionChecker /></DataContextProvider>).dive();

    // Then
    expect(wrapper.find('p')).toHaveLength(1);
    expect(wrapper.find(SkittlesDisplay)).toHaveLength(1);
    expect(wrapper.find(Button)).toHaveLength(1);
    expect(wrapper.find(Button).props().disabled).toBeTruthy();
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
    expect(wrapper.find(Button).props().disabled).toBeTruthy();
    expect(wrapper.find(MessageIcon)).toHaveLength(1);
    expect(wrapper.find(MessageIcon).props().type).toBe('error');
  });

  it('should handle click on start', () => {
    // Given
    useDataContextSpy = jest.spyOn(DataContextModule, 'useDataContext').mockReturnValue(dataAllUpright);
    const wrapper = shallow(<DataContextProvider><PositionChecker /></DataContextProvider>).dive();

    // When
    wrapper.find(Button).simulate('click');

    // Then
    // TODO
  });
});
