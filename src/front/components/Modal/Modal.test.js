import { mount, shallow } from 'enzyme';
import Modal from './index';
import React from 'react';

const givenProps = {
  id: 'my-modal',
  onEditModalInit: jest.fn(),
  title: 'Title',
  footer: 'Footer',
  onCloseEnd: jest.fn(),
};

describe('Modal', () => {
  let querySelectorSpy;

  beforeAll(() => {
    querySelectorSpy = jest.spyOn(document, 'querySelector').mockImplementation((selector) => selector);
    global.M = {
      Modal: {
        init: jest.fn().mockReturnValue('mockedInstance'),
        getInstance: jest.fn().mockReturnValue({ destroy: jest.fn() }),
      },
    };
  });

  afterEach(() => {
    querySelectorSpy.mockClear();
    givenProps.onEditModalInit.mockClear();
    givenProps.onCloseEnd.mockClear();
    global.M.Modal.getInstance().destroy.mockClear();
    global.M.Modal.init.mockClear();
    global.M.Modal.getInstance.mockClear();
  });

  afterAll(() => {
    querySelectorSpy.mockRestore();
    givenProps.onEditModalInit.mockRestore();
    givenProps.onCloseEnd.mockRestore();
    global.M.Modal.getInstance().destroy.mockRestore();
    global.M.Modal.init.mockRestore();
    global.M.Modal.getInstance.mockRestore();
    delete global.M.Modal;
  });

  it('should render the component correctly', () => {
    // Given / When
    const content = <p>Content</p>;
    const component = shallow(<Modal {...givenProps}>{content}</Modal>);

    // Then
    expect(component).toHaveLength(1);
    expect(component.props().id).toBe(givenProps.id);
    expect(component.find('.modal-content')).toHaveLength(1);
    expect(component.find('.modal-content h2')).toHaveLength(1);
    expect(component.find('.modal-content h2').text()).toBe(givenProps.title);
    expect(component.find('.modal-content').props().children[1]).toBe(content);
    expect(component.find('.modal-footer')).toHaveLength(1);
    expect(component.find('.modal-footer').props().children).toBe(givenProps.footer);
  });

  it('should instantiate a MaterializeCSS modal on mount', () => {
    // Given / When
    const content = <p>Content</p>;
    mount(<Modal {...givenProps}>{content}</Modal>);

    // Then
    expect(global.M.Modal.init).toHaveBeenCalledTimes(1);
    expect(global.M.Modal.init).toHaveBeenLastCalledWith(`#${givenProps.id}`, { onCloseEnd: givenProps.onCloseEnd, dismissible: false });
    expect(givenProps.onEditModalInit).toHaveBeenCalledTimes(1);
    expect(givenProps.onEditModalInit).toHaveBeenLastCalledWith('mockedInstance');
  });

  it('should destroy the MaterializeCSS modal on unmount', () => {
    // Given / When
    const component = mount(<Modal {...givenProps}>Content</Modal>);

    // Then
    component.unmount();

    expect(global.M.Modal.getInstance).toHaveBeenCalledTimes(1);
    expect(global.M.Modal.getInstance).toHaveBeenLastCalledWith(`#${givenProps.id}`);
    expect(global.M.Modal.getInstance().destroy).toHaveBeenCalledTimes(1);
  });
});
