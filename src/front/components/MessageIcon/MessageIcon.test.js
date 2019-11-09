import { MESSAGE_TYPE } from '@utils/constants';
import MessageIcon from './index';
import React from 'react';
import { shallow } from 'enzyme';

const givenProps = {
  children: 'Hello World',
};

describe('MessageIcon', () => {
  it('should render the component correctly for warning', () => {
    // Given / When
    const component = shallow(<MessageIcon
      {...givenProps}
      type={MESSAGE_TYPE.WARNING}
    />);

    // Then
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it('should render the component correctly for info', () => {
    // Given / When
    const component = shallow(<MessageIcon
      {...givenProps}
      type={MESSAGE_TYPE.INFO}
    />);

    // Then
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it('should render the component correctly for error', () => {
    // Given / When
    const component = shallow(<MessageIcon
      {...givenProps}
      type={MESSAGE_TYPE.ERROR}
    />);

    // Then
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });
});
