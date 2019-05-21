import React from 'react';
import { FilterGoodsPanel } from '../../../../AdminPanel/GoodsPanel/FilterGoodsPanel';
import { shallow, configure } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';


configure({ adapter: new Adapter() });

function setupComponent(props = {
    updateState: () => { },
}) {
    let component = shallow(<FilterGoodsPanel {...props} />);
    return { component, props };
}

describe('EditGoodsItem --- Snapshot', () => {
    it('Component must be rendered', () => {
        let { component } = setupComponent();
        expect(FilterGoodsPanel.propTypes.updateState).toBe(PropTypes.func);
        expect(shallowToJson(component)).toMatchSnapshot();
    });
});


