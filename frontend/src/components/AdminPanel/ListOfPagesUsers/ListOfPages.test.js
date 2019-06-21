import React from 'react';
import { shallow, configure } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
import ListOfPages from './ListOfPages';

configure({ adapter: new Adapter() });

function setupComponent(props = {
    count: 108,
    limit: 10,
    activePage: 2,
    openPage: () => {}
}) {
    const component = shallow(<ListOfPages {...props} />);
    return { component, props };
}

describe('ListOfPages --- Snapshot', () => {
    it('Component must be rendered', () => {
        const { component } = setupComponent();
        expect(ListOfPages.propTypes.count).toBe(PropTypes.number);
        expect(shallowToJson(component)).toMatchSnapshot();
    });
});
