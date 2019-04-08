import React from 'react';
import Goods from '../../Goods/Goods';
import {shallow, mount, configure } from 'enzyme';
import {shallowToJson,  mountToJson} from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';

configure({ adapter: new Adapter() });

function setupComponent(props = {
    obj : [{
        idgoods : 1,
        name : 'Honda Civic',
        description : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. \
        Blanditiis provident quo quaerat repellat fuga debitis nemo voluptates \
        quis voluptate, dolorem modi non? Nisi, maxime a.',
        catalogue_id_catalogue : 4
    },{
        idgoods : 2,
        name : 'Volvo',
        description : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. \
        Blanditiis provident quo quaerat repellat fuga debitis nemo voluptates \
        quis voluptate, dolorem modi non? Nisi, maxime a.',
        catalogue_id_catalogue : 4
    }]
}) {
    let component = shallow(<Goods {...props} />);
    return { component, props };
}


describe('Goods Component', () => {
    it('Component must be created and props must be correct', () => {
        const { component } = setupComponent();
        
        expect(Goods.propTypes.obj).toBe(PropTypes.array);
        expect(shallowToJson(component)).toMatchSnapshot();
    });
    
});