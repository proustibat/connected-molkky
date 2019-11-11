import * as Api from '@root/front/services/api';
import * as DataContextModule from '@contexts/DataContext';
import * as PlayContextModule from '@contexts/PlayContext';
import Button from '@components/Button';
import CatSVG from '@root/front/svg/cat.svg';
import DogSVG from '@root/front/svg/dog.svg';
import Modal from '@components/Modal';
import ModalGameOver from './index';
import React from 'react';
import { shallow } from 'enzyme';

jest.mock('react-router-dom', () => ({ useHistory: () => ({ push: jest.fn() }) }));

const givenProps = {
  winnerName: 'Team Cat',
  winnerIcon: CatSVG,
  winnerScore: 50,
  loserName: 'Team Dog',
  loserIcon: DogSVG,
  loserScore: 35,
};

const modalInstance = {};

describe('ModalGameOver', () => {
  let useDataContextSpy;
  let usePlayContextSpy;
  let resetGameSpy;

  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation((init) => [init, setState]);

  beforeAll(() => {
    givenProps.onInit = jest.fn();
    useDataContextSpy = jest.spyOn(DataContextModule, 'useDataContext').mockReturnValue({
      setIsLoading: jest.fn(),
    });
    usePlayContextSpy = jest.spyOn(PlayContextModule, 'usePlayContext').mockReturnValue({
      setCurrentTurn: jest.fn(),
      setScores: jest.fn(),
    });
    resetGameSpy = jest.spyOn(Api, 'resetGame').mockResolvedValue({ scores: null, currentTurn: null });
    modalInstance.close = jest.fn();
  });

  afterEach(() => {
    givenProps.onInit.mockClear();
    useDataContextSpy().setIsLoading.mockClear();
    useDataContextSpy.mockClear();
    usePlayContextSpy().setCurrentTurn.mockClear();
    usePlayContextSpy().setScores.mockClear();
    usePlayContextSpy.mockClear();
    resetGameSpy.mockClear();
    modalInstance.close.mockClear();
  });

  afterAll(() => {
    givenProps.onInit.mockRestore();
    useDataContextSpy().setIsLoading.mockRestore();
    useDataContextSpy.mockRestore();
    usePlayContextSpy().setCurrentTurn.mockRestore();
    usePlayContextSpy().setScores.mockRestore();
    usePlayContextSpy.mockRestore();
    resetGameSpy.mockRestore();
    modalInstance.close.mockRestore();
    jest.restoreAllMocks();
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('should render the component correctly', () => {
    // Given / When
    const component = shallow(<ModalGameOver {...givenProps} />);

    // Then
    expect(component).toHaveLength(1);
    expect(component.find(Modal)).toHaveLength(1);
    expect(component.find(Modal).props().footer.type.displayName).toBe(Button.displayName);
    expect(component.find(Modal).props().footer.props.children).toBe('Play Again');
    expect(component.find(Modal)).toMatchSnapshot();
  });

  it('should handle the modal init', () => {
    // Given
    const component = shallow(<ModalGameOver {...givenProps} />);

    // When
    component.find(Modal).props().onInit(modalInstance);

    // Then
    expect(givenProps.onInit).toHaveBeenCalledTimes(1);
    expect(givenProps.onInit).toHaveBeenLastCalledWith(modalInstance);
  });

  it('should handle the play again button', async () => {
    // Given
    const component = await shallow(<ModalGameOver {...givenProps} />);

    // When
    await component.find(Modal).props().onInit(modalInstance);
    await component.find(Modal).props().footer.props.onClick();

    // Then
    expect(useDataContextSpy().setIsLoading).toHaveBeenCalledTimes(2);
    expect(useDataContextSpy().setIsLoading).toHaveBeenNthCalledWith(1, true);
    expect(useDataContextSpy().setIsLoading).toHaveBeenNthCalledWith(2, false);
    expect(resetGameSpy).toHaveBeenCalledTimes(1);
    expect(usePlayContextSpy().setCurrentTurn).toHaveBeenCalledTimes(1);
    expect(usePlayContextSpy().setCurrentTurn).toHaveBeenLastCalledWith(null);
    expect(usePlayContextSpy().setScores).toHaveBeenCalledTimes(1);
    expect(usePlayContextSpy().setScores).toHaveBeenLastCalledWith(null);
    expect(modalInstance.close).toHaveBeenCalledTimes(1);
  });
});
