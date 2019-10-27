import DarkSkyIcon from './index';
import React from 'react';
import Skycons from 'react-skycons';
import constants from '@utils/constants';
import { shallow } from 'enzyme';

const { DARK_SKY_ICONS } = constants;

describe('DarkSkyIcon', () => {
  it('should render the component correctly with default props', () => {
    // Given / When
    const component = shallow(<DarkSkyIcon icon={DARK_SKY_ICONS.PARTLY_CLOUDY_DAY} />);

    // Then
    expect(component).toHaveLength(1);
    expect(component.find(Skycons)).toHaveLength(1);
    expect(component.find(Skycons).props().icon).toBe('PARTLY_CLOUDY_DAY');
    expect(component.find(Skycons).props().color).toBe(DarkSkyIcon.defaultProps.color);
    expect(component.find(Skycons).props().autoplay).toBe(DarkSkyIcon.defaultProps.autoplay);
  });

  it('should render the component correctly with custom props', () => {
    // Given
    const color = 'red';
    const style = { background: 'blue', width: 111 };

    // When
    const component = shallow(<DarkSkyIcon
      icon={DARK_SKY_ICONS.CLEAR_NIGHT}
      color={color}
      style={style}
      autoplay={false}
    />);

    // Then
    expect(component).toHaveLength(1);
    expect(component.find(Skycons)).toHaveLength(1);
    expect(component.find(Skycons).props().icon).toBe('CLEAR_NIGHT');
    expect(component.find(Skycons).props().color).toBe(color);
    expect(component.find(Skycons).props().autoplay).toBe(false);
    expect(component.find(Skycons).props().style).toMatchObject(style);
  });
});
