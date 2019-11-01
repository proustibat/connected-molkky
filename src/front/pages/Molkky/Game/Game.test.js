import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { cleanup, render } from '@testing-library/react';
import Game from './index';
import LoadingBar from '@components/LoadingBar';
import Menu from '@components/Menu';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { dataFromSocketUPDATE } from '@fixtures/molkky';
import gameConfig from '@root/gameConfig';
import { shallow } from 'enzyme';
import socketIOClient from 'socket.io-client';

jest.mock('socket.io-client', () => {
  const emit = jest.fn();
  const on = jest.fn();
  const socket = { emit, on };
  return jest.fn(() => socket);
});

describe('Game', () => {
  const title = 'yo';
  afterEach(() => {
    cleanup();
    socketIOClient().emit.mockClear();
    socketIOClient().on.mockClear();
    socketIOClient.mockClear();
  });

  afterAll(() => {
    socketIOClient().emit.mockRestore();
    socketIOClient().on.mockRestore();
    socketIOClient.mockRestore();
  });

  it('should render the component correctly', () => {
    // Given / When
    const component = shallow(<Game title={title} />);

    // Then
    expect(component).toHaveLength(1);
    expect(component.find(Menu)).toHaveLength(1);
    expect(component.find(Menu).props().title).toBe(title);
    expect(component.find(Switch)).toHaveLength(1);
    expect(component.find(Route)).toHaveLength(2);
    expect(component.find(LoadingBar)).toHaveLength(0);
  });

  it('should listen UPDATE socket event on mount', () => {
    // Given
    act(() => { render(<BrowserRouter><Game title={title} /></BrowserRouter>); });

    // When
    act(() => { socketIOClient().on.mock.calls[0][1](dataFromSocketUPDATE); });

    // Then
    expect(socketIOClient).toHaveBeenCalledTimes(2);
    expect(socketIOClient).toHaveBeenNthCalledWith(1, gameConfig.socketServer);
    expect(socketIOClient().on).toHaveBeenCalledTimes(1);
    expect(socketIOClient().on.mock.calls[0][0]).toBe('UPDATE');
  });
});
