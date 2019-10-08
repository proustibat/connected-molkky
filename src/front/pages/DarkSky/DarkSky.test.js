import React from 'react';
import { shallow } from 'enzyme';
import {initProps} from '../../../fixtures/darksky';
import DarkSky from './index';

describe('Page DarkSky', () => {
    it('should render the page correctly', () => {
        // Given / When
        const component = shallow(<DarkSky {...initProps} />);

        // Then
        expect(component).toHaveLength(1);
        expect(component).toMatchSnapshot();
    });
});