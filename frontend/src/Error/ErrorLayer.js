import React, { Component } from 'react';
import ErrorNotification from './ErrorNotifications';
import PropTypes from 'prop-types';

class ErrorLayer extends Component {
    render() {
        let { Errors } = this.props;
        return (
            <React.Fragment>
                <div
                    id='toasts-container'
                    className='m-3'
                    style={{
                        display: 'block',
                        position: 'fixed',
                        bottom: 0,
                        right: 0,
                        zIndex: 1060
                    }}
                >
                    {Errors.map((el) => {
                        return (
                            <ErrorNotification key={`${el.id}-ErrorNotification`}
                                obj={el} 
                            />
                        );
                    })}

                </div>

            </React.Fragment>
        );
    }
}

ErrorLayer.propTypes = {
    Errors: PropTypes.array
};


export default ErrorLayer;