import * as PlayContextModule from '@contexts/PlayContext';
import * as api from '@root/front/services/api';
import Button from '@components/Button';
import CatSVG from '@root/front/svg/cat.svg';
import DogSVG from '@root/front/svg/dog.svg';
import PositionChecker from '@components/PositionChecker';
import React from 'react';
import StartScreen from './index';
import TeamButton from '@components/TeamButton';
import { serverResultAfterStart } from '@fixtures/molkky';
import { shallow } from 'enzyme';

jest.mock('react-router-dom', () => ({ useHistory: () => ({ push: jest.fn() }) }));

const givenProps = {
  title: 'Game',
};

describe('StartScreen', () => {
  let usePlayContextSpy;
  let startGameSpy;
  let toastSpy;

  beforeAll(() => {
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
    usePlayContextSpy().setCurrentTurn.mockClear();
    usePlayContextSpy().setScores.mockClear();
    usePlayContextSpy.mockClear();
    startGameSpy.mockClear();
  });

  afterAll(() => {
    usePlayContextSpy().setCurrentTurn.mockRestore();
    usePlayContextSpy().setScores.mockRestore();
    usePlayContextSpy.mockRestore();
    startGameSpy.mockRestore();
    jest.restoreAllMocks();
    jest.resetModules();
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
