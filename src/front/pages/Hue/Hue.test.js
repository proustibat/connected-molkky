import React from 'react';
import { shallow } from 'enzyme';
import Button from '../../components/Button';
import {
  ipaddress, connectData, lights, rooms,
} from '../../../fixtures/hue';
import List from '../../components/List';
import Hue from './index';

const roomsEndpoint = '/api/hue/rooms';
const lightsEndpoint = '/api/hue/lights';
const expectedHeaders = { Accept: 'application/json', Authorization: `Bearer ${connectData.token}` };

describe('Page Hue', () => {
  it('should render the page correctly on init', () => {
    // Given / When
    const component = shallow(<Hue />);

    // Then
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it('should render the page correctly with all props and state data', () => {
    // Given / When
    const component = shallow(<Hue title="Hello World!" />);
    component.setState({
      isLoading: false,
      ipaddress,
      token: connectData.token,
      lights,
      rooms,
      ipaddressFromStorage: false,
    });

    // Then
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it('should get data from local storage on mount and update the state', async () => {
    // Given
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => ({
      token: connectData.token,
      ipaddress,
    }[key]));

    // When
    const component = await shallow(<Hue />);

    // Then
    expect(localStorage.getItem).toHaveBeenCalledTimes(2);
    expect(localStorage.getItem.mock.calls[0]).toEqual(['token']);
    expect(localStorage.getItem.mock.calls[1]).toEqual(['ipaddress']);
    expect(component.state().token).toBe(connectData.token);
    expect(component.state().ipaddress).toBe(ipaddress);

    localStorage.getItem.mockRestore();
  });

  it('should clear the local storage if there is a token in it but no ipaddress', async () => {
    // Given
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => ({
      token: connectData.token,
    }[key]));
    jest.spyOn(Storage.prototype, 'clear');

    // When
    const component = await shallow(<Hue />);

    // Then
    expect(localStorage.getItem).toHaveBeenCalledTimes(2);
    expect(localStorage.getItem.mock.calls[0]).toEqual(['token']);
    expect(localStorage.getItem.mock.calls[1]).toEqual(['ipaddress']);
    expect(component.state().token).toBeNull();
    expect(component.state().ipaddress).toBeNull();
    expect(localStorage.clear).toHaveBeenCalledTimes(1);

    localStorage.getItem.mockRestore();
  });

  describe('Given the api requests succeed', () => {
    let component;
    let componentInstance;
    let setStateSpy;

    beforeEach(() => {
      component = shallow(<Hue title="Hello World!" />);
      componentInstance = component.instance();
      component.setState({ ipaddressFromStorage: false });
      setStateSpy = jest.spyOn(componentInstance, 'setState');
    });

    afterEach(() => {
      setStateSpy.mockClear();
    });

    afterAll(() => {
      global.fetch.mockRestore();
      delete global.fetch;
      setStateSpy.mockRestore();
    });

    it('should handle discover request', (done) => {
      // Given
      global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ ipaddress }),
      }));

      // When
      component.find(Button).at(0).simulate('click');

      // Then
      expect(setStateSpy).toHaveBeenCalledTimes(1);
      expect(component.state().isLoading).toBeTruthy();
      setImmediate(() => {
        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenLastCalledWith('/api/hue/discover', { method: 'GET' });
        expect(setStateSpy).toHaveBeenCalledTimes(2);
        expect(component.state().isLoading).toBeFalsy();
        expect(component.state().ipaddress).toBe(ipaddress);

        expect(component).toMatchSnapshot('Render After Discover');

        done();
      });
    });

    it('should handle connect request', (done) => {
      // Given
      component.setState({ ipaddress, token: null });
      global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(connectData),
      }));

      // When
      component.find(Button).at(1).simulate('click');

      // Then
      expect(setStateSpy).toHaveBeenCalledTimes(1);
      expect(component.state().isLoading).toBeTruthy();
      setImmediate(() => {
        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenLastCalledWith(
          '/api/hue/connect',
          {
            method: 'post',
            headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
            body: '{"ipaddress":"192.168.1.10"}',
          },
        );
        expect(setStateSpy).toHaveBeenCalledTimes(2);
        expect(component.state().isLoading).toBeFalsy();
        expect(component.state().token).toBe(connectData.token);
        expect(component.state().ipaddressFromStorage).toBeFalsy();

        expect(component).toMatchSnapshot('Render After Connect');

        done();
      });
    });

    it('should save data after connect request', (done) => {
      // Given
      component.setState({ ipaddress, token: null });
      global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(connectData),
      }));
      jest.spyOn(Storage.prototype, 'setItem');

      // When
      component.find(Button).at(1).simulate('click');

      // Then
      setImmediate(() => {
        expect(localStorage.setItem).toHaveBeenCalledTimes(2);
        expect(localStorage.setItem).toHaveBeenNthCalledWith(1, 'token', 'u-n-i-t_t-e-s-t_t-o-k-e-n');
        expect(localStorage.setItem).toHaveBeenNthCalledWith(2, 'ipaddress', '192.168.1.10');
        localStorage.setItem.mockRestore();
        done();
      });
    });

    it('should handle info request', (done) => {
      // Given
      component.setState({ ipaddress, token: connectData.token });
      global.fetch = jest.fn().mockImplementation((endpoint) => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(endpoint === roomsEndpoint ? rooms : lights),
      }));

      // When
      component.find(Button).at(1).simulate('click');

      // Then
      expect(setStateSpy).toHaveBeenCalledTimes(1);
      expect(component.state().isLoading).toBeTruthy();
      setImmediate(() => {
        expect(global.fetch).toHaveBeenCalledTimes(2);
        expect(global.fetch).toHaveBeenNthCalledWith(1, roomsEndpoint, { method: 'get', headers: expectedHeaders });
        expect(global.fetch).toHaveBeenNthCalledWith(2, lightsEndpoint, { method: 'get', headers: expectedHeaders });
        expect(setStateSpy).toHaveBeenCalledTimes(2);
        expect(component.state().isLoading).toBeFalsy();
        expect(component.state().rooms).toBe(rooms);
        expect(component.state().lights).toBe(lights);

        expect([
          component.find(List).at(0).props().title,
          component.find(List).at(1).props().title,
        ]).toMatchSnapshot();

        expect(component).toMatchSnapshot('Render After Info Request');

        done();
      });
    });

    it('should render the information lists correctly when there is no element', (done) => {
      // Given
      component.setState({ ipaddress, token: connectData.token });
      const mockedResponse = { ok: true, json: () => Promise.resolve(null) };
      global.fetch = jest.fn().mockImplementation(() => Promise.resolve(mockedResponse));

      // When
      component.find(Button).at(1).simulate('click');

      // Then
      setImmediate(() => {
        expect([
          component.find(List).at(0).props().title,
          component.find(List).at(1).props().title,
        ]).toMatchSnapshot();
        done();
      });
    });

    it('should render the information lists correctly when there is only one element', (done) => {
      // Given
      component.setState({ ipaddress, token: connectData.token });
      global.fetch = jest.fn().mockImplementation(() => Promise.resolve({ ok: true, json: () => Promise.resolve(['single element']) }));

      // When
      component.find(Button).at(1).simulate('click');

      // Then
      setImmediate(() => {
        expect([
          component.find(List).at(0).props().title,
          component.find(List).at(1).props().title,
        ]).toMatchSnapshot();
        done();
      });
    });
  });

  describe('Given the api requests fail', () => {
    const errorMessage = 'unit test error';
    let toastSpy; let component; let componentInstance; let setStateSpy;

    beforeAll(() => {
      const mockedResponse = { ok: false, statusText: errorMessage };
      global.fetch = jest.fn().mockImplementation(() => Promise.resolve(mockedResponse));
      toastSpy = jest.fn();
      global.M = { toast: toastSpy };
    });

    beforeEach(() => {
      // Given
      component = shallow(<Hue title="Hello World!" />);
      component.setState({ ipaddressFromStorage: false });
      componentInstance = component.instance();
      setStateSpy = jest.spyOn(componentInstance, 'setState');
    });

    afterEach(() => {
      setStateSpy.mockRestore();
      global.fetch.mockClear();
      global.M.toast.mockClear();
    });

    afterAll(() => {
      global.fetch.mockRestore();
      global.M.toast.mockRestore();
      delete global.fetch;
      delete global.M.toast;
      delete global.M;
    });

    it('should handle error on discover request', (done) => {
      // When
      component.find(Button).at(0).simulate('click');

      // Then
      expect(setStateSpy).toHaveBeenCalledTimes(1);
      expect(component.state().isLoading).toBeTruthy();
      setImmediate(() => {
        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenLastCalledWith('/api/hue/discover', { method: 'GET' });

        expect(setStateSpy).toHaveBeenCalledTimes(2);
        expect(component.state().isLoading).toBeFalsy();

        expect(toastSpy).toHaveBeenCalledTimes(1);
        expect(toastSpy).toHaveBeenLastCalledWith({ html: errorMessage, classes: 'red darken-4' });

        done();
      });
    });

    it('should handle error on connect request', (done) => {
      // Given
      component.setState({ ipaddress, token: null });

      // When
      component.find(Button).at(1).simulate('click');

      // Then
      expect(setStateSpy).toHaveBeenCalledTimes(1);
      expect(component.state().isLoading).toBeTruthy();
      setImmediate(() => {
        // expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenLastCalledWith('/api/hue/connect', { method: 'post', headers: { Accept: 'application/json', 'Content-Type': 'application/json' }, body: '{"ipaddress":"192.168.1.10"}' });

        expect(setStateSpy).toHaveBeenCalledTimes(2);
        expect(component.state().isLoading).toBeFalsy();

        expect(toastSpy).toHaveBeenCalledTimes(1);
        expect(toastSpy).toHaveBeenLastCalledWith({ html: errorMessage, classes: 'red darken-4' });

        done();
      });
    });

    it('should handle error on info request', (done) => {
      // Given
      component.setState({ ipaddress, token: connectData.token });

      // When
      component.find(Button).at(1).simulate('click');

      // Then
      expect(setStateSpy).toHaveBeenCalledTimes(1);
      expect(component.state().isLoading).toBeTruthy();
      setImmediate(() => {
        expect(global.fetch).toHaveBeenCalledTimes(2);
        expect(global.fetch).toHaveBeenNthCalledWith(1, roomsEndpoint, { method: 'get', headers: expectedHeaders });
        expect(global.fetch).toHaveBeenNthCalledWith(2, lightsEndpoint, { method: 'get', headers: expectedHeaders });

        expect(setStateSpy).toHaveBeenCalledTimes(2);
        expect(component.state().isLoading).toBeFalsy();

        expect(toastSpy).toHaveBeenCalledTimes(1);
        expect(toastSpy).toHaveBeenLastCalledWith({ html: errorMessage, classes: 'red darken-4' });
        done();
      });
    });
  });
});
