import * as Api from '@root/front/services/api';
import * as DataContextModule from '@contexts/DataContext';
import * as PlayContextModule from '@contexts/PlayContext';
import { serverResultAfterMiss, serverResultAfterScore } from '@fixtures/molkky';
import CurrentTurn from '@components/CurrentTurn';
import PlayScreen from './index';
import React from 'react';
import ScoresOverview from '@components/ScoresOverview';
import { shallow } from 'enzyme';

describe('PlayScreen', () => {
  let usePlayContextSpy;
  let useDataContextSpy;
  let scorePointsSpy;
  let missTargetSpy;

  beforeAll(() => {
    scorePointsSpy = jest.spyOn(Api, 'scorePoints').mockReturnValue(serverResultAfterScore);
    missTargetSpy = jest.spyOn(Api, 'missTarget').mockReturnValue(serverResultAfterMiss);
    usePlayContextSpy = jest.spyOn(PlayContextModule, 'usePlayContext').mockReturnValue({
      currentTurn: {
        isPlaying: 'dog',
      },
      setCurrentTurn: jest.fn(),
      setScores: jest.fn(),
    });
    useDataContextSpy = jest.spyOn(DataContextModule, 'useDataContext').mockReturnValue({
      setIsLoading: jest.fn(),
    });
  });

  afterEach(() => {
    scorePointsSpy.mockClear();
    missTargetSpy.mockClear();
    usePlayContextSpy().setCurrentTurn.mockClear();
    usePlayContextSpy().setScores.mockClear();
    usePlayContextSpy.mockClear();
    useDataContextSpy().setIsLoading.mockClear();
    useDataContextSpy.mockClear();
  });

  afterAll(() => {
    scorePointsSpy.mockRestore();
    missTargetSpy.mockRestore();
    usePlayContextSpy().setCurrentTurn.mockRestore();
    usePlayContextSpy().setScores.mockRestore();
    usePlayContextSpy.mockRestore();
    useDataContextSpy().setIsLoading.mockRestore();
    useDataContextSpy.mockRestore();
  });

  it('should render the component correctly', () => {
    // Given / When
    const component = shallow(<PlayScreen />);

    // Then
    expect(component).toHaveLength(1);
    expect(component.find(ScoresOverview)).toHaveLength(1);
    expect(component.find(CurrentTurn)).toHaveLength(1);
  });

  it('should handle points validation', (done) => {
    // Given
    const component = shallow(<PlayScreen />);

    // When
    component.find(CurrentTurn).props().onValid(2)();

    // Then
    expect(useDataContextSpy().setIsLoading).toHaveBeenCalledTimes(1);
    expect(useDataContextSpy().setIsLoading).toHaveBeenLastCalledWith(true);
    setImmediate(() => {
      expect(scorePointsSpy).toHaveBeenCalledTimes(1);
      expect(scorePointsSpy).toHaveBeenLastCalledWith({
        team: usePlayContextSpy().currentTurn.isPlaying, points: 2,
      });
      expect(usePlayContextSpy().setCurrentTurn).toHaveBeenCalledTimes(1);
      expect(usePlayContextSpy().setCurrentTurn)
        .toHaveBeenLastCalledWith(serverResultAfterScore.currentTurn);
      expect(usePlayContextSpy().setScores).toHaveBeenCalledTimes(1);
      expect(usePlayContextSpy().setScores).toHaveBeenLastCalledWith(serverResultAfterScore.scores);
      expect(useDataContextSpy().setIsLoading).toHaveBeenCalledTimes(2);
      expect(useDataContextSpy().setIsLoading).toHaveBeenLastCalledWith(false);
      done();
    });
  });

  it('should handle target missing', (done) => {
    // Given
    const component = shallow(<PlayScreen />);

    // When
    component.find(CurrentTurn).props().onMiss();

    // Then
    expect(useDataContextSpy().setIsLoading).toHaveBeenCalledTimes(1);
    expect(useDataContextSpy().setIsLoading).toHaveBeenLastCalledWith(true);
    setImmediate(() => {
      expect(missTargetSpy).toHaveBeenCalledTimes(1);
      expect(missTargetSpy).toHaveBeenLastCalledWith(usePlayContextSpy().currentTurn.isPlaying);
      expect(usePlayContextSpy().setCurrentTurn).toHaveBeenCalledTimes(1);
      expect(usePlayContextSpy().setCurrentTurn)
        .toHaveBeenLastCalledWith(serverResultAfterMiss.currentTurn);
      expect(usePlayContextSpy().setScores).toHaveBeenCalledTimes(1);
      expect(usePlayContextSpy().setScores).toHaveBeenLastCalledWith(serverResultAfterMiss.scores);
      expect(useDataContextSpy().setIsLoading).toHaveBeenCalledTimes(2);
      expect(useDataContextSpy().setIsLoading).toHaveBeenLastCalledWith(false);
      done();
    });
  });
});
