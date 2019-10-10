import React from 'react';
import { shallow } from 'enzyme';
import Button from '../../components/Button';
import {
  ipaddress, connectData, lights, rooms,
} from '../../../fixtures/hue';
import List from '../../components/List';
import Hue from './index';

const roomsEndpoint = `/api/hue/rooms?ipaddress=${ipaddress}&username=${connectData.user.username}`;
const lightsEndpoint = `/api/hue/lights?ipaddress=${ipaddress}&username=${connectData.user.username}`;

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
      ipaddress, connectData, lights, rooms,
    });

    // Then
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  describe('Given the api requests succeed', () => {
    let component; let componentInstance; let
      setStateSpy;

    beforeEach(() => {
      component = shallow(<Hue title="Hello World!" />);
      componentInstance = component.instance();
      setStateSpy = jest.spyOn(componentInstance, 'setState');
    });

    afterEach(() => {
      setStateSpy.mockClear();
    });

    afterEach(() => {
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

        done();
      });
    });

    it('should handle connect request', (done) => {
      // Given
      component.setState({ ipaddress });
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
        expect(component.state().connectData).toBe(connectData);

        done();
      });
    });

    it('should handle info request', (done) => {
      // Given
      component.setState({ ipaddress, connectData });
      global.fetch = jest.fn().mockImplementation((endpoint) => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(endpoint === roomsEndpoint ? rooms : lights),
      }));

      // When
      component.find(Button).at(2).simulate('click');

      // Then
      expect(setStateSpy).toHaveBeenCalledTimes(1);
      expect(component.state().isLoading).toBeTruthy();
      setImmediate(() => {
        expect(global.fetch).toHaveBeenCalledTimes(2);
        expect(global.fetch).toHaveBeenNthCalledWith(1, roomsEndpoint, { method: 'get' });
        expect(global.fetch).toHaveBeenNthCalledWith(2, lightsEndpoint, { method: 'get' });
        expect(setStateSpy).toHaveBeenCalledTimes(2);
        expect(component.state().isLoading).toBeFalsy();
        expect(component.state().rooms).toBe(rooms);
        expect(component.state().lights).toBe(lights);

        expect([
          component.find(List).at(0).props().title,
          component.find(List).at(1).props().title,
        ]).toMatchSnapshot();
        done();
      });
    });

    it('should render the information lists correctly when there is no element', (done) => {
      // Given
      component.setState({ ipaddress, connectData });
      const mockedResponse = { ok: true, json: () => Promise.resolve(null) };
      global.fetch = jest.fn().mockImplementation(() => Promise.resolve(mockedResponse));

      // When
      component.find(Button).at(2).simulate('click');

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
      component.setState({ ipaddress, connectData });
      global.fetch = jest.fn().mockImplementation(() => Promise.resolve({ ok: true, json: () => Promise.resolve(['single element']) }));

      // When
      component.find(Button).at(2).simulate('click');

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
    let toastSpy; let component; let componentInstance; let
      setStateSpy;

    beforeAll(() => {
      const mockedResponse = { ok: false, statusText: errorMessage };
      global.fetch = jest.fn().mockImplementation(() => Promise.resolve(mockedResponse));
      toastSpy = jest.fn();
      global.M = { toast: toastSpy };
    });

    beforeEach(() => {
      // Given
      component = shallow(<Hue title="Hello World!" />);
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
      component.setState({ ipaddress });

      // When
      component.find(Button).at(1).simulate('click');

      // Then
      expect(setStateSpy).toHaveBeenCalledTimes(1);
      expect(component.state().isLoading).toBeTruthy();
      setImmediate(() => {
        expect(global.fetch).toHaveBeenCalledTimes(1);
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
      component.setState({ ipaddress, connectData });

      // When
      component.find(Button).at(2).simulate('click');

      // Then
      expect(setStateSpy).toHaveBeenCalledTimes(1);
      expect(component.state().isLoading).toBeTruthy();
      setImmediate(() => {
        expect(global.fetch).toHaveBeenCalledTimes(2);
        expect(global.fetch).toHaveBeenNthCalledWith(1, roomsEndpoint, { method: 'get' });
        expect(global.fetch).toHaveBeenNthCalledWith(2, lightsEndpoint, { method: 'get' });

        expect(setStateSpy).toHaveBeenCalledTimes(2);
        expect(component.state().isLoading).toBeFalsy();

        expect(toastSpy).toHaveBeenCalledTimes(1);
        expect(toastSpy).toHaveBeenLastCalledWith({ html: errorMessage, classes: 'red darken-4' });
        done();
      });
    });
  });
});
