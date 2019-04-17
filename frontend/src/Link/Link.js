import React, { Component } from 'react';

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

export default Link;