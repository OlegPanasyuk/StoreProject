import React from 'react';
import NavBarAdminPanel from '../../../AdminPanel/NavBarAdminPanel/NavBarAdminPanel';
import { shallow, configure} from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';

configure({ adapter: new Adapter() });

function setupComponent(props = {
    match: {
        url: '/adminpanel'
    }
}) {
    let component = shallow(<NavBarAdminPanel {...props} />);
    return { component, props };
}

describe('NavBarAdminPanel --- Snapshot', () => {
    it('+++capturing Snapshot of ShoppingBasket', () => {
        const obj = setupComponent();
        expect(NavBarAdminPanel.propTypes.match).toBe(PropTypes.object);
        expect(shallowToJson(obj.component)).toMatchSnapshot();
    });
});