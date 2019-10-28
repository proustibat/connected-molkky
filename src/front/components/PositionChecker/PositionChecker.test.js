import * as DataContextModule from '@contexts/DataContext';
import { dataAllUpright, dataWithKnockedOverAndNull } from '@fixtures/molkky';
import MessageIcon from '@components/MessageIcon';
import PositionChecker from './index';
import React from 'react';
import SkittlesDisplay from '@components/SkittlesDisplay';
import { mount } from 'enzyme';

describe('PositionChecker', () => {
  let useDataContextSpy;
  let givenProps;

  beforeAll(() => {
    givenProps = {
      onReadyChange: jest.fn(),
    };
  });

  afterEach(() => {
    useDataContextSpy.mockClear();
    givenProps.onReadyChange.mockClear();
  });

  afterAll(() => {
    useDataContextSpy.mockRestore();
    givenProps.onReadyChange.mockRestore();
  });

  it('should render the component correctly when all pins are upright', () => {
    // Given
    useDataContextSpy = jest.spyOn(DataContextModule, 'useDataContext').mockReturnValue({ positionData: dataAllUpright });

    // When
    const wrapper = mount(<PositionChecker {...givenProps} />);

    // Then
    expect(wrapper.find('p')).toHaveLength(1);
    expect(wrapper.find(SkittlesDisplay)).toHaveLength(1);
    expect(wrapper.find(MessageIcon)).toHaveLength(0);
    expect(givenProps.onReadyChange).toHaveBeenCalledTimes(1);
    expect(givenProps.onReadyChange).toHaveBeenLastCalledWith(true);
  });

  it('should render the component correctly when some pins are knocked over and some are null', () => {
    // Given
    useDataContextSpy = jest.spyOn(DataContextModule, 'useDataContext').mockReturnValue({ positionData: dataWithKnockedOverAndNull });

    // When
    const wrapper = mount(<PositionChecker {...givenProps} />);

    // Then
    expect(wrapper.find('p')).toHaveLength(3);
    expect(wrapper.find(SkittlesDisplay)).toHaveLength(1);
    expect(wrapper.find(MessageIcon)).toHaveLength(2);
    const lists = wrapper.find('ul');
    expect(lists).toHaveLength(2);
    expect(lists.at(0).find('li')).toHaveLength(2);
    expect(lists.at(0).find('li').map((li) => li.props().children)).toStrictEqual([2, 4]);
    expect(lists.at(1).find('li')).toHaveLength(3);
    expect(lists.at(1).find('li').map((li) => li.props().children)).toStrictEqual([1, 5, 6]);
    expect(givenProps.onReadyChange).toHaveBeenLastCalledWith(false);
  });

  it('should render an error message if there is no data', () => {
    // Given
    useDataContextSpy = jest.spyOn(DataContextModule, 'useDataContext').mockReturnValue({ positionData: [] });

    // When
    const wrapper = mount(<PositionChecker {...givenProps} />);

    // Then
    expect(wrapper.find('p')).toHaveLength(2);
    expect(wrapper.find(MessageIcon)).toHaveLength(1);
    expect(wrapper.find(MessageIcon).props().type).toBe('error');
    expect(givenProps.onReadyChange).toHaveBeenLastCalledWith(false);
  });
});
