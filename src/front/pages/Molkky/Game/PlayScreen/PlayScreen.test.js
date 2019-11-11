import * as Api from '@root/front/services/api';
import * as DataContextModule from '@contexts/DataContext';
import * as PlayContextModule from '@contexts/PlayContext';
import { serverResultAfterMiss, serverResultAfterScore } from '@fixtures/molkky';
import CatSVG from '@root/front/svg/cat.svg';
import CurrentTurn from '@components/CurrentTurn';
import DogSVG from '@root/front/svg/dog.svg';
import ModalEdit from '@components/ModalEdit';
import ModalGameOver from '@components/ModalGameOver';
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
    expect(component.find(ModalEdit)).toHaveLength(1);
    expect(component.find(ModalGameOver)).toHaveLength(0);
  });

  it('should handle points validation', (done) => {
    // Given
    const component = shallow(<PlayScreen />);

    // When
    component.find(CurrentTurn).props().onValid(2);

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

  it('should open the edit modal', () => {
    // Given
    const component = shallow(<PlayScreen />);

    // When
    component.find(CurrentTurn).props().onEdit();

    // Then
    expect(component.find(ModalEdit).props().openModal).toBeTruthy();
  });

  it('should handle the close modal action', () => {
    // Given
    const component = shallow(<PlayScreen />);

    // When
    component.find(CurrentTurn).props().onEdit();
    component.find(ModalEdit).props().onClose();

    // Then
    expect(component.find(ModalEdit).props().openModal).toBeFalsy();
  });

  it('should handle the edit validation', (done) => {
    // Given
    const component = shallow(<PlayScreen />);

    // When
    component.find(CurrentTurn).props().onEdit();
    component.find(ModalEdit).props().onModalValid(12);

    // Then
    expect(useDataContextSpy().setIsLoading).toHaveBeenCalledTimes(1);
    expect(useDataContextSpy().setIsLoading).toHaveBeenLastCalledWith(true);

    setImmediate(() => {
      expect(scorePointsSpy).toHaveBeenCalledTimes(1);
      expect(scorePointsSpy).toHaveBeenLastCalledWith({
        team: usePlayContextSpy().currentTurn.isPlaying, points: 12,
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

  it('should display the game over modal', () => {
    // Given
    usePlayContextSpy.mockRestore();
    usePlayContextSpy = jest.spyOn(PlayContextModule, 'usePlayContext').mockReturnValue({
      currentTurn: { wining: 'cat', over: true, losing: 'dog' },
      setCurrentTurn: jest.fn(),
      setScores: jest.fn(),
      teams: { cat: { name: 'Team Cat', icon: CatSVG }, dog: { name: 'Team Dog', icon: DogSVG } },
      scores: { cat: { score: 50, left: 0 }, dog: { score: 46, left: 4 } },
    });

    // When
    const component = shallow(<PlayScreen />);

    // Then
    expect(component.find(ModalGameOver)).toHaveLength(1);
    expect(component.find(ModalGameOver).props()).toMatchSnapshot('modal game over props');
  });
});
