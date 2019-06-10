import React from 'react';

import PropTypes from 'prop-types';
import ErrorNotificationComponent from './ErrorNotifications';

function ErrorLayer({
    Errors
}) {
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
                {Errors.map(el => (
                    <ErrorNotificationComponent
                        key={`${el.id}-ErrorNotification`}
                        obj={el}
                    />
                ))}

            </div>

        </React.Fragment>
    );
}

ErrorLayer.propTypes = {
    Errors: PropTypes.array
};

ErrorLayer.defaultProps = {
    Errors: []
};

export default ErrorLayer;
