import React from 'react';
import { shallow } from 'enzyme';
import constants from '@utils/constants';
import MessageIcon from './index';

const givenProps = {
  children: 'Hello World',
};

describe('MessageIcon', () => {
  it('should render the component correctly for warning', () => {
    // Given / When
    const component = shallow(<MessageIcon
      {...givenProps}
      type={constants.MESSAGE_TYPE.WARNING}
    />);

    // Then
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it('should render the component correctly for info', () => {
    // Given / When
    const component = shallow(<MessageIcon
      {...givenProps}
      type={constants.MESSAGE_TYPE.INFO}
    />);

    // Then
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it('should render the component correctly for error', () => {
    // Given / When
    const component = shallow(<MessageIcon
      {...givenProps}
      type={constants.MESSAGE_TYPE.ERROR}
    />);

    // Then
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });
});
