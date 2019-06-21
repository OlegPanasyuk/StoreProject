import React from 'react';
import { shallow, configure } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
import { FilterGoodsPanel } from './FilterGoodsPanel';


configure({ adapter: new Adapter() });

function setupComponent(props = {
    updateState: () => { }
}) {
    const component = shallow(<FilterGoodsPanel {...props} />);
    return { component, props };
}

describe('EditGoodsItem --- Snapshot', () => {
    it('Component must be rendered', () => {
        const { component } = setupComponent();
        expect(FilterGoodsPanel.propTypes.updateState).toBe(PropTypes.func);
        expect(shallowToJson(component)).toMatchSnapshot();
    });
});
