import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Link extends Component {
    render() {
        let { text, href, className, ConverStatusUser } = this.props;
        return (
            <a 
                href={href} 
                className={className}
                onClick={(e) => ConverStatusUser(e)}
            >
                {text}
            </a>
        );
    }
}

Link.propTypes = {
    text: PropTypes.string,
    href: PropTypes.string,
    className: PropTypes.string,
    ConverStatusUser: PropTypes.func
};

export default Link;