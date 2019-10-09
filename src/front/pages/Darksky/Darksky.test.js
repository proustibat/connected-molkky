import React from 'react';
import { shallow } from 'enzyme';
import {initProps} from '../../../fixtures/darksky';
import Darksky from './index';

describe('Page Darksky', () => {
    it('should render the page correctly', () => {
        // Given / When
        const component = shallow(<Darksky {...initProps} />);

        // Then
        expect(component).toHaveLength(1);
        expect(component).toMatchSnapshot();
    });
});