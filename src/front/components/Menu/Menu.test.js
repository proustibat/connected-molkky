import React from 'react';
import { shallow, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import MenuLinks from '@components/Menu/MenuLinks';
import Menu from './index';

describe('MenuLinks', () => {
  const { M } = global;
  const title = 'Hello World';
  let querySelectorAllSpy;
  let sidenav;

  beforeAll(() => {
    sidenav = document.createElement('ul');
    sidenav.setAttribute('class', 'sidenav');
    querySelectorAllSpy = jest.spyOn(document, 'querySelectorAll').mockImplementation(() => sidenav);

    delete window.M;
    window.M = { Sidenav: { init: jest.fn() } };
  });

  afterEach(() => {
    querySelectorAllSpy.mockClear();
    window.M.Sidenav.init.mockClear();
  });

  afterAll(() => {
    window.M = M;
    querySelectorAllSpy.mockRestore();
  });

  it('should render the component correctly', () => {
    // Given / When
    const component = shallow(<Menu title={title} />);

    // Then
    expect(component).toHaveLength(1);
    expect(component.find('nav')).toHaveLength(1);
    expect(component.find('nav').find('a')).toHaveLength(2);
    expect(component.find('nav').find('a').at(0).props().children).toBe(title);
    expect(component.find('nav').find('a').at(1).props()).toMatchSnapshot('mobile menu link props');
    expect(component.find(MenuLinks)).toHaveLength(2);
    expect(component.find(MenuLinks).at(1).props()).toMatchSnapshot('mobile menu props');
  });

  it('should initialize the menu on mount', () => {
    // Given / When
    act(() => { mount(<Menu title={title} />); });

    // Then
    expect(global.M.Sidenav.init).toHaveBeenCalledTimes(1);
    expect(querySelectorAllSpy).toHaveBeenCalledTimes(1);
    expect(global.M.Sidenav.init.mock.calls[0][0]).toBe(sidenav);
  });
});
