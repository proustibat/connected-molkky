import * as PlayContextModule from '@contexts/PlayContext';
import CatSVG from '@root/front/svg/cat.svg';
import DogSVG from '@root/front/svg/dog.svg';
import React from 'react';
import ScoreTeamOverview from '@components/ScoreTeamOverview';
import ScoresOverview from './index';
import { shallow } from 'enzyme';

describe('ScoresOverview', () => {
  let usePlayContextSpy;
  beforeEach(() => {
    usePlayContextSpy = jest.spyOn(PlayContextModule, 'usePlayContext').mockReturnValue({
      teams: { cat: { name: 'cat team', icon: CatSVG }, dog: { name: 'dog team', icon: DogSVG } },
      currentTurn: { isPlaying: 'dog' },
      scores: { cat: { score: 50, left: 0 }, dog: { score: 50, left: 0 } },
    });
  });

  afterEach(() => {
    usePlayContextSpy.mockClear();
  });

  afterAll(() => {
    usePlayContextSpy.mockRestore();
  });

  it('should render the component correctly', () => {
    // Given / When
    const component = shallow(<ScoresOverview />);

    // Then
    expect(component).toHaveLength(1);
    expect(component.find('h1')).toHaveLength(1);
    expect(component.find(ScoreTeamOverview)).toHaveLength(2);
  });
});
