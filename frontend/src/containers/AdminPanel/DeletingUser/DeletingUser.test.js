import React from 'react';
import { DeletingUser } from '../../../../AdminPanel/UsersPanel/DeletingUser';
import { shallow, configure } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';

configure({ adapter: new Adapter() });

function setupComponent(props = {
    id: 1,
    onHide: ()=>{}
}) {
    let component = shallow(<DeletingUser {...props} />);
    return { component, props };
}

describe('DeletingUser --- Snapshot', () => {
    it('Component must be rendered', () => {
        let { component } = setupComponent();
        expect(DeletingUser.propTypes.id).toBe(PropTypes.number);
        expect(shallowToJson(component)).toMatchSnapshot();
    });
});
