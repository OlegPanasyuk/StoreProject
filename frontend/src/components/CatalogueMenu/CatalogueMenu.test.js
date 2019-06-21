import React from 'react';
import { shallow, configure } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
import CatalogueMenu from './CatalogueMenu';

configure({ adapter: new Adapter() });

function setupComponent(props = {
    obj: {
        1: {
            id_catalogue: 1,
            name: 'Car',
            description: 'Group 1',
            parent_id: -1
        },
        2: {
            id_catalogue: 2,
            name: 'BigCars',
            description: 'Group 2',
            parent_id: -1
        }
    },
    handleClick: (i) => { alert(`Click by Item Menu${i}`); },
    requestGoods: () => {}
}) {
    const component = shallow(<CatalogueMenu {...props} />);
    return { component, props };
}

describe('CatalogueMenu', () => {
    it('Component must be created and props must be correct', () => {
        const { component } = setupComponent();
        expect(CatalogueMenu.propTypes.obj).toBe(PropTypes.object);
        expect(shallowToJson(component)).toMatchSnapshot();
    });
});
