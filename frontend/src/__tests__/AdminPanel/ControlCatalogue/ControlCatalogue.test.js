import React from 'react';
import
ControlCatalogueConnected,
{ ControlCatalogue }
    from '../../../AdminPanel/ControlCatalogue/ControlCatalogue';
import { shallow, configure, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

configure({ adapter: new Adapter() });

function setupComponent(props = {
    addCatalogueItemClose: () => { },
    editCatalogueItem: () => { }
}) {
    let component = shallow(<ControlCatalogue {...props} />);
    return { component, props };
}

describe('ControlCatalogue --- Snapshot', () => {
    it('Component must be rendered', () => {
        let { component } = setupComponent();
        expect(ControlCatalogue.propTypes.editCatalogueItem).toBe(PropTypes.func);
        expect(shallowToJson(component)).toMatchSnapshot();
    });
});