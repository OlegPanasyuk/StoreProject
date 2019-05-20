import React from 'react';
import TreeViewConnected, { TreeView } from '../../../../AdminPanel/ControlCatalogue/TreeView';
import { shallow, configure, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
//import rest from 'rest';

//import { addGoodsToBasket, deleteGoodsFromBasket } from '../../REDUX/actions/actionsShoppingBasket';

configure({ adapter: new Adapter() });

function setupComponent(props = {
    data: [
        { "id_catalogue": 1, "name": "Cars", "description": "GROUP 1 For simple Cars s", "parent_id": -1 },
        { "id_catalogue": 2, "name": "BigCars", "description": "Group 2", "parent_id": -1 },
        { "id_catalogue": 3, "name": "Tanks", "description": "Group 3", "parent_id": -1 },
        { "id_catalogue": 4, "name": "Sedans", "description": "Group 1 -> Sedans", "parent_id": 1 },
        { "id_catalogue": 5, "name": "Hatchbacks", "description": "Group 1 -> Hatchbacks", "parent_id": 1 }, 
        { "id_catalogue": 6, "name": "Trucks", "description": "Group 2 -> Trucks", "parent_id": 2 }, 
        { "id_catalogue": 7, "name": "Common", "description": "Group 3 -> Common", "parent_id": 3 }, 
        { "id_catalogue": 9, "name": "Light Tanks", "description": "Group 3 -> Light Tanks", "parent_id": 3 }, 
        { "id_catalogue": 12, "name": "Carss", "description": "GROUP !", "parent_id": -1 }, 
        { "id_catalogue": 13, "name": "Carssssss", "description": "Super", "parent_id": 14 }, 
        { "id_catalogue": 14, "name": "BigCars", "description": "BigCars", "parent_id": 6 }],
    isChildElement: false,
    haveChildren: true,
    obj: { name: 'Catalogue', id_catalogue: -1 },
    isParentToggled: true,
    level: 1,
    showEditForm: () => { },
    editCatalogueItem: () => { },
    editItem: { }
}) {
    let component = shallow(<TreeView {...props} />);
    return { component, props };
}


describe('TreeView --- Snapshot', () => {
    it('Component must be rendered', () => {
        let obj = setupComponent();
        expect(TreeView.propTypes.data).toBe(PropTypes.array);
        expect(TreeView.propTypes.obj).toBe(PropTypes.object);
        expect(shallowToJson(obj.component)).toMatchSnapshot();
    });
});

describe('TreeView', () => {
    const initialState = {
        adminPanel_catalogue: {
            editItem: {
                id_catalogue: 2,
                description: 'Description',
                name: 'Goods',
                parent_id: -1
            }
        }
    };

    const mockStore = configureStore();
    let store, wrapper, props;
    beforeEach(() => {
        props = {
            data: [
                { "id_catalogue": 1, "name": "Cars", "description": "GROUP 1 For simple Cars s", "parent_id": -1 },
                { "id_catalogue": 2, "name": "BigCars", "description": "Group 2", "parent_id": -1 },
                { "id_catalogue": 3, "name": "Tanks", "description": "Group 3", "parent_id": -1 },
                { "id_catalogue": 4, "name": "Sedans", "description": "Group 1 -> Sedans", "parent_id": 1 },
                { "id_catalogue": 5, "name": "Hatchbacks", "description": "Group 1 -> Hatchbacks", "parent_id": 1 }, 
                { "id_catalogue": 6, "name": "Trucks", "description": "Group 2 -> Trucks", "parent_id": 2 }, 
                { "id_catalogue": 7, "name": "Common", "description": "Group 3 -> Common", "parent_id": 3 }, 
                { "id_catalogue": 9, "name": "Light Tanks", "description": "Group 3 -> Light Tanks", "parent_id": 3 }, 
                { "id_catalogue": 12, "name": "Carss", "description": "GROUP !", "parent_id": -1 }, 
                { "id_catalogue": 13, "name": "Carssssss", "description": "Super", "parent_id": 14 }, 
                { "id_catalogue": 14, "name": "BigCars", "description": "BigCars", "parent_id": 6 }],
            isChildElement: false,
            haveChildren: true,
            obj: { name: 'Catalogue', id_catalogue: -1 },
            isParentToggled: true,
            level: 1,
            showEditForm: () => { },
            editCatalogueItem: () => { },
            editItem: {}
        };
        store = mockStore(initialState);
        wrapper = mount(
            <Provider store={store}>
                <TreeViewConnected {...props}
                />
            </Provider>);
    });
    it('+++ render the connected(SMART) component', () => {
        expect(wrapper.find(TreeViewConnected).length).toEqual(1);
    });

    
});