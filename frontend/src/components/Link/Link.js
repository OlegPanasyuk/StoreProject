import React from 'react';
import PropTypes from 'prop-types';

function Link({
    text,
    href,
    className,
    ConverStatusUser
}) {
    return (
        <a
            href={href}
            className={className}
            onClick={e => ConverStatusUser(e)}
        >
            {text}
        </a>
    );
}

Link.propTypes = {
    text: PropTypes.string,
    href: PropTypes.string,
    className: PropTypes.string,
    ConverStatusUser: PropTypes.func
};

Link.defaultProps = {
    text: 'Link',
    href: '/',
    className: '',
    ConverStatusUser: () => {}
};

export default Link;
