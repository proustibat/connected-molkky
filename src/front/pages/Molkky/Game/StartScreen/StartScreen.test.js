import * as DataContextModule from '@contexts/DataContext';
import * as PlayContextModule from '@contexts/PlayContext';
import * as services from '@utils/services';
import Button from '@components/Button';
import CatSVG from '@root/front/svg/cat.svg';
import DogSVG from '@root/front/svg/dog.svg';
import PositionChecker from '@components/PositionChecker';
import React from 'react';
import StartScreen from './index';
import TeamButton from '@components/TeamButton';
import constants from '@utils/constants';
import { shallow } from 'enzyme';

jest.mock('react-router-dom', () => ({ useHistory: () => ({ push: jest.fn() }) }));

const givenProps = {
  title: 'Game',
};

describe('StartScreen', () => {
  let usePlayContextSpy;
  let useDataContextSpy;

  beforeAll(() => {
    jest.spyOn(services, 'getRandomPositionData').mockReturnValue(Array.from({ length: 12 }, (_, i) => ({
      value: i + 1,
      position: constants.POSITION.UPRIGHT,
    })));
    useDataContextSpy = jest.spyOn(DataContextModule, 'useDataContext').mockReturnValue({
      destroyFakeServer: jest.fn(),
    });
  });

  beforeEach(() => {
    usePlayContextSpy = jest.spyOn(PlayContextModule, 'usePlayContext').mockReturnValue({
      teams: {
        cat: { name: 'cat team', icon: CatSVG },
        dog: { name: 'dog team', icon: DogSVG },
      },
      setCurrentTurn: jest.fn(),
      setScores: jest.fn(),
    });
  });

  afterEach(() => {
    useDataContextSpy().destroyFakeServer.mockClear();
    usePlayContextSpy().setCurrentTurn.mockClear();
    usePlayContextSpy().setScores.mockClear();
    usePlayContextSpy.mockClear();
    useDataContextSpy.mockClear();
    services.getRandomPositionData.mockClear();
  });

  afterAll(() => {
    useDataContextSpy().destroyFakeServer.mockRestore();
    usePlayContextSpy().setCurrentTurn.mockRestore();
    usePlayContextSpy().setScores.mockRestore();
    usePlayContextSpy.mockRestore();
    useDataContextSpy.mockRestore();
    services.getRandomPositionData.mockRestore();
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

  it('should handle click on start button', () => {
    // Given
    const component = shallow(<StartScreen {...givenProps} />);

    // When
    component.find(PositionChecker).props().onReadyChange(true);
    component.find(Button).simulate('click');

    // Then
    expect(useDataContextSpy().destroyFakeServer).toHaveBeenCalledTimes(1);
    expect(usePlayContextSpy().setCurrentTurn).toHaveBeenCalledTimes(1);
    expect(usePlayContextSpy().setCurrentTurn).toHaveBeenLastCalledWith({ isPlaying: 'cat' });
    expect(usePlayContextSpy().setScores).toHaveBeenLastCalledWith({
      cat: { score: 0, left: 50 },
      dog: { score: 0, left: 50 },
    });
  });
});
