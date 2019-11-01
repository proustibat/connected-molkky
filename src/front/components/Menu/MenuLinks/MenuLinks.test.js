import * as Api from '@root/front/services/api';
import { cleanup, fireEvent, render } from '@testing-library/react';
import Button from '@components/Button';
import MenuLinks from './index';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { shallow } from 'enzyme';

describe('MenuLinks', () => {
  let startFakeSkittlesSpy;
  let stopFakeSkittlesSpy;
  let simulateThrowSpy;

  beforeAll(() => {
    startFakeSkittlesSpy = jest.spyOn(Api, 'startFakeSkittles').mockReturnValue({
      mock: { skittles: true },
    });

    stopFakeSkittlesSpy = jest.spyOn(Api, 'stopFakeSkittles').mockReturnValue({
      mock: { skittles: false },
    });

    simulateThrowSpy = jest.spyOn(Api, 'simulateThrow').mockReturnValue({});
  });

  afterEach(() => {
    cleanup();
    startFakeSkittlesSpy.mockClear();
    stopFakeSkittlesSpy.mockClear();
    simulateThrowSpy.mockClear();
  });

  afterAll(() => {
    startFakeSkittlesSpy.mockRestore();
    stopFakeSkittlesSpy.mockRestore();
    simulateThrowSpy.mockRestore();
  });

  it('should render the component correctly', () => {
    // Given / When
    const component = shallow(<MenuLinks />);

    // Then
    expect(component).toHaveLength(1);
    expect(component.find('ul')).toHaveLength(1);
    expect(component.find('li')).toHaveLength(2);
    expect(component.find(Button)).toHaveLength(2);
  });

  it('should inherit classname, id and style', () => {
    // Given / When
    const [id, className, style] = ['my-id', 'my-class', { background: 'red' }];
    const component = shallow(<MenuLinks {...{ id, className, style }} />);

    // Then
    expect(component.props().id).toBe(id);
    expect(component.props().className).toBe(className);
    expect(component.props().style).toMatchObject(style);
  });

  it('should call api to start or stop the fake server', async (done) => {
    // Given
    const component = render(<MenuLinks />);

    // When
    const btn = await component.findByText('Start fake server');
    act(() => { fireEvent.click(btn); });

    setImmediate(async () => {
      // Then
      expect(startFakeSkittlesSpy).toHaveBeenCalledTimes(1);

      // When
      act(() => { fireEvent.click(btn); });

      // Then
      expect(stopFakeSkittlesSpy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('should call api to simulate a throw', async () => {
    // Given
    const component = render(<MenuLinks />);

    // When
    const btn = await component.findByText('Simulate a throw');
    act(() => { fireEvent.click(btn); });

    // Then
    expect(simulateThrowSpy).toHaveBeenCalledTimes(1);
  });
});
