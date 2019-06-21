import React from 'react';
import
EditCatalogueItemConnected,
{ EditCatalogueItem }
    from '../../../../AdminPanel/ControlCatalogue/EditCatalogueItem';
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
    addErrorToState: () => { },
    editItem: {
        show: false,
        id_catalogue: 1,
        name: '',
        description: '',
        parent_id: ''
    }
}) {
    let component = shallow(<EditCatalogueItem {...props} />);
    return { component, props };
}

describe('EditCatalogueItem --- Snapshot', () => {
    it('Component must be rendered', () => {
        let { component } = setupComponent();
        expect(EditCatalogueItem.propTypes.editItem).toBe(PropTypes.object);
        expect(shallowToJson(component)).toMatchSnapshot();
    });
});

describe('EditCatalogueItem ', () => {
    let initialState = {
        adminPanel_catalogue: {
            editItem: {
                show: false,
                id_catalogue: 1,
                name: 'nnn',
                description: 'ddd',
                parent_id: -1
            }
        }
    };

    const mockStore = configureStore();
    let store, wrapper;
    beforeEach(() => {
        store = mockStore(initialState);
        wrapper = mount(<Provider store={store}><EditCatalogueItemConnected /></Provider>);
    });
    it('+++ render the connected(SMART) component',() => {
        expect(wrapper.find(EditCatalogueItemConnected).length).toEqual(1);
    });
});
