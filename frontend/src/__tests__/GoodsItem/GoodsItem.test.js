import React from 'react';
import GoodsItem from '../../GoodsItem/GoodsItem';
import { shallow, configure } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
import rest from 'rest';

configure({ adapter: new Adapter() });

import pathPrefix from 'rest/interceptor/pathPrefix';
import errorCode from 'rest/interceptor/errorCode';
import mime from 'rest/interceptor/mime';

const client = rest.wrap(mime, { mime: 'application/json' })
    .wrap(errorCode, { code: 500 })
    .wrap(pathPrefix, { prefix: 'http://localhost:3300' });


function addItemGoodsToDB(obj = {
    name: 'TestFromTests',
    description: 'Lorem Test For Tests and Only Tests',
    catalogue_id_catalogue: 5
}) {
    return new client({ method: 'POST', path: 'goods', entity: obj });
}

function deleteItemGoodsFromDB(id) {
    let query = '?id=' + id;
    client({ method: 'DELETE', path: 'goods' + query }).then(() => {

    });
}
function setupComponent(props = {
    obj: {
        idgoods: 1,
        name: 'Honda Civic',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. \
        Blanditiis provident quo quaerat repellat fuga debitis nemo voluptates \
        quis voluptate, dolorem modi non? Nisi, maxime a.',
        catalogue_id_catalogue: 4
    }
}) {
    let component = shallow(<GoodsItem {...props} />);
    return { component, props };
}

// eslint-disable-next-line no-undef
describe('GoodsItem ', () => {
    // eslint-disable-next-line no-undef
    it('Component must be created', () => {
        const { component } = setupComponent();

        // eslint-disable-next-line no-undef
        expect(GoodsItem.propTypes.obj).toBe(PropTypes.object);
        // eslint-disable-next-line no-undef
        expect(shallowToJson(component)).toMatchSnapshot();

    });
    // eslint-disable-next-line no-undef
    it('Component must be rendered after creation', () => {
        let obj = {};

        return addItemGoodsToDB()
            .then((res) => {
                obj = res.entity;
                const { component } = setupComponent({ obj: obj });
                deleteItemGoodsFromDB(obj.idgoods);
                // eslint-disable-next-line no-undef
                expect(shallowToJson(component)).toMatchSnapshot();
            })
            .catch((e) => {
                throw new Error(e);
            });

    });
});