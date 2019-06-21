import React from 'react';
import { shallow, configure } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
import { Breadcrumb } from 'react-bootstrap';
import BreadCrumbs from './BreadCrumbs';

configure({ adapter: new Adapter() });

function setupComponent(props = {
    obj: [{
        id: null,
        name: 'Home'
    }, {
        id: 1,
        name: 'Car'
    }],
    handleClick: (i) => { alert(`Click by BreadCrumb.Item${i}`); }
}) {
    const component = shallow(<BreadCrumbs {...props} />);
    return { component, props };
}


describe('BreadCrumbs Component', () => {
    it('Component must be created and props must be correct', () => {
        const { component } = setupComponent();

        expect(BreadCrumbs.propTypes.obj).toBe(PropTypes.array);
        expect(BreadCrumbs.propTypes.handleClick).toBe(PropTypes.func);
        expect(shallowToJson(component)).toMatchSnapshot();
    });

    it('Component must children must be clicked ', () => {
        const { component, props } = setupComponent();
        window.alert = jest.fn();
        for (let i = 0; i < props.obj.length; i++) {
            component.find(Breadcrumb.Item).at(i).simulate('click');
            expect(window.alert).toHaveBeenCalledWith(`Click by BreadCrumb.Item${props.obj[i].id}`);
        }
    });
});
