import React from 'react';
import DeletingFormConnected, { DeletingForm } from '../../../../AdminPanel/ControlCatalogue/DeletingForm';
import { shallow, configure, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';

configure({ adapter: new Adapter() });

function setupComponent(props = {
    getCatalogue: () => { },
    onHide: () => { },
    editCatalogueItem: () => { },
    addErrorToState: () => { },
    show: true
}) {
    let component = shallow(<DeletingForm {...props} />);
    return { component, props };
}

describe('DeletingForm --- Snapshot', () => {
    it('Component must be rendered', () => {
        let { component } = setupComponent();
        //expect(DeletingForm.find(Modal).length).toEqual(1);
        expect(DeletingForm.propTypes.show).toBe(PropTypes.bool);
        expect(shallowToJson(component)).toMatchSnapshot();
    });
});

describe('DeletingForm', () => {
    let initialState = {
        adminPanel_catalogue: {
            editItem: {
                show: false,
                id_catalogue: '',
                name: '',
                description: '',
                parent_id: ''
            }
        }
    };

    const mockStore = configureStore();
    let store, wrapper;
    beforeEach(() => {
        store = mockStore(initialState);
        wrapper = mount(<Provider store={store}><DeletingFormConnected /></Provider>);
    });

    it('+++ render the connected(SMART) component', () => {
        expect(wrapper.find(DeletingFormConnected).length).toEqual(1);
        expect(wrapper.find(Modal).length).toEqual(1);
        // expect(wrapper.find(Button).length).toEqual(2); !!!WTF???
    });
});