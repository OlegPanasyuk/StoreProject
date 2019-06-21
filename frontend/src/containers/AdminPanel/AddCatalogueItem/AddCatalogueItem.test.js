import React from 'react';
import AddCatalogueItemConnected, { AddCatalogueItem } from '../../../../AdminPanel/ControlCatalogue/AddCatalogueItem';
import { shallow, configure, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

configure({ adapter: new Adapter() });

function setupComponent(props = {
    getCatalogue: () => { },
    cancel: () => { },
    addCatalogueItem: () => { },
    addErrorToState: () => { },
    addItem: {
        show: false,
        name: '',
        description: '',
        parent_id: ''
    }
}) {
    let component = shallow(<AddCatalogueItem {...props} />);
    return { component, props };
}

describe('AddCatalogueItem --- Snapshot', () => {
    it('Component must be rendered', () => {
        let { component } = setupComponent();
        expect(AddCatalogueItem.propTypes.addItem).toBe(PropTypes.object);
        expect(shallowToJson(component)).toMatchSnapshot();
    });
});


describe('AddCatalogueItem ', () => {
    let initialState = {
        adminPanel_catalogue: {
            addItem: {
                show: false,
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
        wrapper = mount(<Provider store={store}><AddCatalogueItemConnected /></Provider>);
    });
    it('+++ render the connected(SMART) component',() => {
        expect(wrapper.find(AddCatalogueItemConnected).length).toEqual(1);
    });
});

