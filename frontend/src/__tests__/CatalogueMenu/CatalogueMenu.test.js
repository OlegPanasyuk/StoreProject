import React from 'react';
import CatalogueMenu from '../../CatalogueMenu/CatalogueMenu';
import {shallow, mount, configure } from 'enzyme';
import {shallowToJson,  mountToJson} from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
 
configure({ adapter: new Adapter() });

function setupComponent(props = {
    obj : {
        1 : {
            id_catalogue : 1,
            name : 'Car',
            description : 'Group 1',
            parent_id : -1
        },
        2 : {
            id_catalogue : 2,
            name : 'BigCars',
            description : 'Group 2',
            parent_id : -1
        }},
    handleClick : (i) => { alert(`Кликнули по Item Menu${i}`);},
    requestGoods : () => {}
}) {
    let component = shallow(<CatalogueMenu {...props} />);
    return { component, props };
}

describe('CatalogueMenu', () => {
    it('Component must be created and props must be correct', () => {
        const { component, props } = setupComponent();
        //CatalogueMenu.handleClick(1);
        expect(CatalogueMenu.propTypes.obj).toBe(PropTypes.object);
        expect(shallowToJson(component)).toMatchSnapshot();
    });
});