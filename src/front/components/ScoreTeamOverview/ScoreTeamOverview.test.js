import CatSVG from '@root/front/svg/cat.svg';
import React from 'react';
import ScoreTeamOverview from './index';
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
    expect(component.find('.card-title').text()).toBe(givenProps.team.name);
    expect(component.find('.card-title i')).toHaveLength(0);
    expect(component.find('.card-content')).toHaveLength(1);
    expect(component.find('.card-content strong')).toHaveLength(2);
    expect(component.find('.card-content strong').at(0).text()).toBe(givenProps.score.toString());
    expect(component.find('.card-content strong').at(1).text()).toBe(givenProps.left.toString());
  });

  it('should display the wining prop', () => {
    // Given / When
    const component = shallow(<ScoreTeamOverview {...givenProps} wining />);

    // Then
    expect(component.find('.card-title i')).toHaveLength(1);
    expect(component.find('.card-title i').text()).toBe('grade');
  });

  it('should display the isPlaying state', () => {
    // Given / When
    const component = shallow(<ScoreTeamOverview {...givenProps} isPlaying />);

    // Then
    expect(component).toHaveLength(1);
    expect(component.props().className).toContain('z-depth-4');
    expect(component.props().style).toMatchObject(style.containerHighlighted);
  });
});
