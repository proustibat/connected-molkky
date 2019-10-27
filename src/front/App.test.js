import App from './App';
import Home from './pages/Home';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { shallow } from 'enzyme';

jest.mock('react-dom', () => ({
  hydrate: jest.fn(),
}));

describe('App', () => {
  const { location, M, __INITIAL_PROPS__ } = global;

  const div = document.createElement('div');
  div.setAttribute('id', 'root');

  const props = { bla: 'bli' };

  let getElementByIdSpy;
  let app;

  beforeAll(() => {
    // Given
    getElementByIdSpy = jest.spyOn(document, 'getElementById').mockImplementation(() => div);

    delete window.location;
    window.location = { reload: jest.fn() };

    delete window.M;
    window.M = { toast: jest.fn() };

    delete window.__INITIAL_PROPS__;
    window.__INITIAL_PROPS__ = props;

    app = new App();
  });

  afterAll(() => {
    getElementByIdSpy.mockRestore();
    window.location = location;
    window.M = M;
    window.__INITIAL_PROPS__ = __INITIAL_PROPS__;
  });

  it('should define a mapper on instantiation', () => {
    // Then
    expect(app.routeComponentMapper).toBeDefined();
  });

  it('should hydrate the right component with the props', () => {
    // When
    global.location.pathname = '/';
    app.init();

    // Then
    expect(ReactDOM.hydrate).toHaveBeenCalledTimes(1);
    const wrapper = shallow(ReactDOM.hydrate.mock.calls[0][0]);
    expect(wrapper.find(Router)).toHaveLength(1);
    expect(wrapper.find(Router).find(Home)).toHaveLength(1);
    expect(wrapper.find(Router).find(Home).props()).toMatchObject(props);
    expect(ReactDOM.hydrate.mock.calls[0][1]).toBe(div);
  });

  it('should display an error toast if init fails', () => {
    // When
    global.location.pathname = '/dsaflkdjflkdj';
    app.init();

    // Then
    expect(global.M.toast).toHaveBeenCalledTimes(1);
  });

  it('should call the app from the index', () => {
    // Given / When
    // eslint-disable-next-line global-require
    const index = require('./index').default;

    // Then
    expect(index instanceof App).toBeTruthy();
  });
});
