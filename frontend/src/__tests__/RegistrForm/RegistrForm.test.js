import React from 'react';
import RegistrForm from '../../RegistrForm/RegistrForm';
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


function setupComponent(props = {
    setUserInState: ()=>{}
}) {
    let component = shallow(<RegistrForm {...props} />);
    return { component, props };
}


// eslint-disable-next-line no-undef
describe('ReggistrForm', () => {
    // eslint-disable-next-line no-undef
    it('Component must be created', () => {
        const { component } = setupComponent();
      
        // eslint-disable-next-line no-undef
        expect(RegistrForm.propTypes.setUserInState).toBe(PropTypes.func);
        
        // eslint-disable-next-line no-undef
        expect(shallowToJson(component)).toMatchSnapshot();

    });
});