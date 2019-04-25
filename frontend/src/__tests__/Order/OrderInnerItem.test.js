import React from 'react';
import OrderInnerItem from '../../Order/OrderInnerItem';
import { shallow, configure } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';

configure({ adapter: new Adapter() });

function setupComponent(props = {
    obj: {
        name: 'admin',
        price: 1222
    }
}) {
    let component = shallow(<OrderInnerItem {...props} />);
    return { component, props };
}

describe('OrderInnerItem', () => {
    it('Component should be rendered', () => {
        let { component } = setupComponent();
        expect(OrderInnerItem.propTypes.obj).toBe(PropTypes.object);
        expect(shallowToJson(component)).toMatchSnapshot();
    });
});