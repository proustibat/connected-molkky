import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import { useDataContext } from '@contexts/DataContext';
import { usePlayContext } from '@contexts/PlayContext';

const TestComponent = ({ onContext, useContextFunc }) => {
  useEffect(() => {
    const ctx = useContextFunc();
    onContext(ctx);
  }, [useContextFunc]);
  return <div>Test Component</div>;
};
TestComponent.propTypes = {
  onContext: PropTypes.func.isRequired,
  useContextFunc: PropTypes.func.isRequired,
};

describe('Contexts', () => {
  const fakeContext = { fake: 'context' };
  let onContextSpy;
  let useContextSpy;

  // Given
  beforeAll(() => {
    useContextSpy = jest.spyOn(React, 'useContext').mockReturnValue(fakeContext);
    onContextSpy = jest.fn();
  });

  // When
  it('should export a context on for each use hooks', () => {
    // When
    mount(<TestComponent onContext={onContextSpy} useContextFunc={useDataContext} />);
    mount(<TestComponent onContext={onContextSpy} useContextFunc={usePlayContext} />);
  });

  // Then
  afterEach(() => {
    expect(useContextSpy).toHaveBeenCalledTimes(2);
    expect(onContextSpy).toHaveBeenCalledTimes(2);
    expect(onContextSpy.mock.calls.every(([context]) => context === fakeContext)).toBeTruthy();

    useContextSpy.mockClear();
    onContextSpy.mockClear();
  });

  afterAll(() => {
    useContextSpy.mockRestore();
    onContextSpy.mockRestore();
  });
});
