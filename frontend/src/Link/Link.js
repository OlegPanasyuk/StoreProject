import React, { Component } from 'react';

class Link extends Component {
    constructor(props) {
        super(props);
      }
    
    render() {
        let { text, href } = this.props;
        return (
            <a href={href}>
                {text}
            </a>
        );
    }
}

export default Link;