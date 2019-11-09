import { cleanup, fireEvent, render } from '@testing-library/react';
import { POSITION } from '@utils/constants';
import React from 'react';
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
      <Skittle value="qwerty" position={POSITION.UPRIGHT} />,
    );

    // Then
    expect(container).toMatchSnapshot();
  });

  it('should render the component correctly with knocked over position prop', () => {
    // Given / When
    const { container } = render(
      <Skittle value="qwerty" position={POSITION.KNOCKED_OVER} />,
    );

    // Then
    expect(container).toMatchSnapshot();
  });

  it('should handle click', () => {
    // Given
    const onClickSpy = jest.fn();
    const value = 'qwerty';
    const { container } = render(
      <Skittle value={value} position={POSITION.KNOCKED_OVER} onClick={onClickSpy} />,
    );

    // When
    fireEvent.click(container.querySelector('div'));

    // Then
    expect(onClickSpy).toHaveBeenCalledTimes(1);
    expect(onClickSpy).toHaveBeenLastCalledWith(value);
  });
});
