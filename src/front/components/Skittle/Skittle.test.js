import React from 'react';
import { render, cleanup } from '@testing-library/react';
import constants from '@utils/constants';
import Skittle from './index';


describe('Skittle', () => {
  afterEach(cleanup);

  it('should render the component correctly without position prop', () => {
    // Given / When
    const { container } = render(
      <Skittle value="qwerty" />,
    );

    // Then
    expect(container).toMatchSnapshot();
  });

  it('should render the component correctly with upright position prop', () => {
    // Given / When
    const { container } = render(
      <Skittle value="qwerty" position={constants.POSITION.UPRIGHT} />,
    );

    // Then
    expect(container).toMatchSnapshot();
  });

  it('should render the component correctly with knocked over position prop', () => {
    // Given / When
    const { container } = render(
      <Skittle value="qwerty" position={constants.POSITION.KNOCKED_OVER} />,
    );

    // Then
    expect(container).toMatchSnapshot();
  });
});
