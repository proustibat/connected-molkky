import { cleanup, render } from '@testing-library/react';
import { mount, shallow } from 'enzyme';
import Molkky from './index';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { dataFromSocketUPDATE } from '@fixtures/molkky';
import socketIOClient from 'socket.io-client';

jest.mock('socket.io-client', () => {
  const emit = jest.fn();
  const on = jest.fn();
  const socket = { emit, on };
  return jest.fn(() => socket);
});

const givenProps = {
  title: 'Yo',
};

describe('Molkky', () => {
  afterEach(cleanup);
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should render the component correctly with no skittles data', () => {
    // Given / When
    const component = shallow(<Molkky {...givenProps} />);

    // Then
    expect(component).toHaveLength(1);
    expect(component.find('h1')).toHaveLength(1);
    expect(component.find('h1').first().text()).toBe(givenProps.title);
    expect(component.find('table')).toHaveLength(1);
    expect(component.find('thead')).toHaveLength(1);
    expect(component.find('tr')).toHaveLength(1);
    expect(component.find('th')).toHaveLength(4);
  });

  it('should connect to the socket and listen UPDATE event', () => {
    // Given / When
    mount(<Molkky {...givenProps} />);

    // Then
    expect(socketIOClient).toHaveBeenCalledTimes(1);
    expect(socketIOClient).toHaveBeenLastCalledWith('localhost:8888');
    expect(socketIOClient().on).toHaveBeenCalledTimes(1);
    expect(socketIOClient().on.mock.calls[0][0]).toBe('UPDATE');
  });

  it('should use data from UPDATE socket event', async () => {
    // Given
    let component;
    act(() => { component = render(<Molkky {...givenProps} />); });

    // When
    act(() => { socketIOClient().on.mock.calls[0][1](dataFromSocketUPDATE); });

    // Then
    expect(component.container).toMatchSnapshot();
  });
});
