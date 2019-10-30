import { cleanup, render } from '@testing-library/react';
import CatSVG from '@root/front/svg/cat.svg';
import React from 'react';
import ScoreTeamOverview from './index';
import { act } from 'react-dom/test-utils';
import { shallow } from 'enzyme';
import style from './style';

const givenProps = {
  score: 45,
  left: 5,
  team: {
    name: 'cat',
    icon: CatSVG,
  },
};

describe('ScoreTeamOverview', () => {
  it('should render the component correctly', () => {
    // Given / When
    const component = shallow(<ScoreTeamOverview {...givenProps} />);

    // Then
    expect(component).toHaveLength(1);
    expect(component.props().className).not.toContain('z-depth-4');
    expect(component.props().style).not.toMatchObject(style.containerHighlighted);
    expect(component.find('div')).toHaveLength(4);
    expect(component.find('.card')).toHaveLength(1);
    expect(component.find('.card-image')).toHaveLength(1);
    expect(component.find('.card-image').find(CatSVG)).toHaveLength(1);
    expect(component.find('.card-stacked')).toHaveLength(1);
    expect(component.find('.card-title')).toHaveLength(1);
    expect(component.find('.card-title span').text()).toBe(givenProps.team.name);
    expect(component.find('.card-content')).toHaveLength(1);
    expect(component.find('.card-content strong')).toHaveLength(1);
    expect(component.find('.card-content strong').first().text()).toBe(givenProps.left.toString());
    expect(component.find('.card p')).toHaveLength(2);
    expect(component.find('.card p').at(1).text(1)).toBe(givenProps.score.toString());
    expect(component.find('.card p').at(1).props().className).toContain('scale-in');
  });

  it('should animate the score', async () => {
    // Given / When
    jest.useFakeTimers();
    const component = render(<ScoreTeamOverview {...givenProps} wining />);
    act(() => {
      jest.runOnlyPendingTimers();
    });

    // Then
    const score = await component.findByText('45');
    expect(score.className).toContain('scale-in');
    jest.clearAllTimers();
    cleanup();
  });

  it('should display the isPlaying state', () => {
    // Given / When
    const component = shallow(<ScoreTeamOverview {...givenProps} isPlaying />);

    // Then
    expect(component).toHaveLength(1);
    expect(component.props().className).toContain('z-depth-1');
    expect(component.props().style).toMatchObject(style.containerHighlighted);
  });
});
