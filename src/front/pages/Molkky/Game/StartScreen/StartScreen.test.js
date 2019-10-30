import * as DataContextModule from '@contexts/DataContext';
import * as PlayContextModule from '@contexts/PlayContext';
import * as api from '@root/front/services/api';
import * as services from '@utils';
import Button from '@components/Button';
import CatSVG from '@root/front/svg/cat.svg';
import DogSVG from '@root/front/svg/dog.svg';
import PositionChecker from '@components/PositionChecker';
import React from 'react';
import StartScreen from './index';
import TeamButton from '@components/TeamButton';
import constants from '@utils/constants';
import { serverResultAfterStart } from '@fixtures/molkky';
import { shallow } from 'enzyme';

jest.mock('react-router-dom', () => ({ useHistory: () => ({ push: jest.fn() }) }));

const givenProps = {
  title: 'Game',
};

describe('StartScreen', () => {
  let usePlayContextSpy;
  let useDataContextSpy;
  let startGameSpy;
  let toastSpy;

  beforeAll(() => {
    jest.spyOn(services, 'getRandomPositionData').mockReturnValue(Array.from({ length: 12 }, (_, i) => ({
      value: i + 1,
      position: constants.POSITION.UPRIGHT,
    })));

    useDataContextSpy = jest.spyOn(DataContextModule, 'useDataContext').mockReturnValue({
      destroyFakeServer: jest.fn(),
    });

    usePlayContextSpy = jest.spyOn(PlayContextModule, 'usePlayContext').mockReturnValue({
      teams: {
        cat: { name: 'cat team', icon: CatSVG },
        dog: { name: 'dog team', icon: DogSVG },
      },
      setCurrentTurn: jest.fn(),
      setScores: jest.fn(),
    });

    startGameSpy = jest.spyOn(api, 'startGame').mockReturnValue(serverResultAfterStart);

    toastSpy = jest.fn();
    global.M = { toast: toastSpy };
  });

  afterEach(() => {
    useDataContextSpy().destroyFakeServer.mockClear();
    usePlayContextSpy().setCurrentTurn.mockClear();
    usePlayContextSpy().setScores.mockClear();
    usePlayContextSpy.mockClear();
    useDataContextSpy.mockClear();
    startGameSpy.mockClear();
    services.getRandomPositionData.mockClear();
    global.fetch && global.fetch.mockClear();
    global.M && global.M.toast.mockClear();
  });

  afterAll(() => {
    useDataContextSpy().destroyFakeServer.mockRestore();
    usePlayContextSpy().setCurrentTurn.mockRestore();
    usePlayContextSpy().setScores.mockRestore();
    usePlayContextSpy.mockRestore();
    useDataContextSpy.mockRestore();
    startGameSpy.mockRestore();
    services.getRandomPositionData.mockRestore();
    jest.restoreAllMocks();
    jest.resetModules();

    global.fetch.mockRestore();
    delete global.fetch;

    global.M.toast.mockRestore();
    delete global.M.toast;
    delete global.M;
  });

  it('should render the component correctly', () => {
    // Given / When
    const component = shallow(<StartScreen {...givenProps} />);

    // Then
    expect(component).toHaveLength(1);
    expect(component.find('h1')).toHaveLength(2);
    expect(component.find(TeamButton)).toHaveLength(2);
    expect(component.find(TeamButton).at(0).props().selected).toBeTruthy();
    expect(component.find(TeamButton).at(1).props().selected).toBeFalsy();
    expect(component.find(PositionChecker)).toHaveLength(1);
    expect(component.find(Button)).toHaveLength(1);
    expect(component.find(Button).props().disabled).toBeTruthy();
  });

  it('should select the team', () => {
    // Given
    const component = shallow(<StartScreen {...givenProps} />);

    // When
    component.find(TeamButton).at(1).props().onClick('dog');

    // Then
    expect(component.find(TeamButton).at(0).props().selected).toBeFalsy();
    expect(component.find(TeamButton).at(1).props().selected).toBeTruthy();
  });

  it('should enable play button', () => {
    // Given
    const component = shallow(<StartScreen {...givenProps} />);

    // When
    component.find(PositionChecker).props().onReadyChange(true);

    // Then
    expect(component.find(Button).props().disabled).toBeFalsy();
  });

  it('should handle click on start button', (done) => {
    // Given
    const component = shallow(<StartScreen {...givenProps} />);

    // When
    component.find(PositionChecker).props().onReadyChange(true);
    component.find(Button).simulate('click');

    // Then
    setImmediate(() => {
      expect(useDataContextSpy().destroyFakeServer).toHaveBeenCalledTimes(1);
      expect(startGameSpy).toHaveBeenCalledTimes(1);
      expect(startGameSpy).toHaveBeenLastCalledWith({ teams: ['cat', 'dog'], playingTeam: 'cat' });
      expect(usePlayContextSpy().setCurrentTurn).toHaveBeenCalledTimes(1);
      expect(usePlayContextSpy().setCurrentTurn)
        .toHaveBeenLastCalledWith(serverResultAfterStart.currentTurn);
      expect(usePlayContextSpy().setScores).toHaveBeenCalledTimes(1);
      expect(usePlayContextSpy().setScores).toHaveBeenLastCalledWith(serverResultAfterStart.scores);
      done();
    });
  });
});
