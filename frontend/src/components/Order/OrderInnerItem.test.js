import React from 'react';
import { shallow, configure } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
import OrderInnerItem from './OrderInnerItem';

configure({ adapter: new Adapter() });

function setupComponent(props = {
    obj: {
        name: 'admin',
        price: 1222
    }
}) {
    const component = shallow(<OrderInnerItem {...props} />);
    return { component, props };
}

describe('OrderInnerItem', () => {
    it('Component should be rendered', () => {
        const { component } = setupComponent();
        expect(OrderInnerItem.propTypes.obj).toBe(PropTypes.object);
        expect(shallowToJson(component)).toMatchSnapshot();
    });
});
