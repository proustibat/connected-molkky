import * as DataContextModule from '@contexts/DataContext';
import * as Services from '@utils/index';
import Button from '@components/Button';
import Modal from '@components/Modal';
import ModalEdit from './index';
import React from 'react';
import SkittlesDisplay from '@components/SkittlesDisplay';
import { dataWithValue4 } from '@fixtures/molkky';
import { mount } from 'enzyme';

const givenProps = {
  onModalValid: jest.fn(),
  onClose: jest.fn(),
  openModal: false,
};

describe('ModalEdit', () => {
  let useDataContextSpy;
  let calculatePointsSpy;

  beforeAll(() => {
    useDataContextSpy = jest.spyOn(DataContextModule, 'useDataContext').mockReturnValue({
      positionData: dataWithValue4,
    });

    calculatePointsSpy = jest.spyOn(Services, 'calculatePoints').mockReturnValue(4);
  });

  afterEach(() => {
    useDataContextSpy.mockClear();
    calculatePointsSpy.mockClear();
    givenProps.onModalValid.mockClear();
    givenProps.onClose.mockClear();
  });

  afterAll(() => {
    useDataContextSpy.mockRestore();
    calculatePointsSpy.mockRestore();
    givenProps.onModalValid.mockRestore();
    givenProps.onClose.mockRestore();
  });

  it('should render the component correctly', () => {
    // Given / When
    const component = mount(<ModalEdit {...givenProps} />);

    // Then
    expect(component).toHaveLength(1);
    expect(component.find(Modal)).toHaveLength(1);
    expect(component.find(Modal).props().onCloseEnd).toBe(givenProps.onClose);
    expect(component.find(Modal).find('.modal-footer').find(Button)).toHaveLength(2);
    expect(component.find(Modal).find(SkittlesDisplay)).toHaveLength(1);
    expect(component.find(Modal).find(SkittlesDisplay).props().editMode).toBeTruthy();
  });

  it('should handle the open', async () => {
    // Given
    const component = await mount(<ModalEdit {...givenProps} openModal={false} />);
    const modalInstance = { open: jest.fn() };

    // When
    await component.find(Modal).props().onEditModalInit(modalInstance);
    await component.setProps({ openModal: true });

    // Then
    expect(modalInstance.open).toHaveBeenCalledTimes(1);
  });

  it('should handle the validation', () => {
    // Given
    const component = mount(<ModalEdit {...givenProps} />);
    calculatePointsSpy.mockClear();

    // When
    component.find(Modal).find(SkittlesDisplay).props().onChange(dataWithValue4);
    component.find(Modal).find('.modal-footer').find(Button).at(1)
      .simulate('click');

    // Then
    expect(givenProps.onModalValid).toHaveBeenCalledTimes(1);
    expect(givenProps.onModalValid).toHaveBeenLastCalledWith(4);
    expect(calculatePointsSpy).toHaveBeenCalledTimes(1);
  });
});
