import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import TreeView from './TreeView';

export class ControlCatalogue extends Component {
    render() {
        let data = {
            lorem: {
                ipsum: 'dolor sit',
                amet: {
                    consectetur: 'adipiscing',
                    elit: [
                        'duis',
                        'vitae',
                        {
                            semper: 'orci'
                        },
                        {
                            est: 'sed ornare'
                        },
                        'etiam',
                        ['laoreet', 'tincidunt'],
                        ['vestibulum', 'ante']
                    ]
                },
                kk: 'primis'
            }
        };
        return (
            <Container>
                <TreeView data={data} name="data" />
            </Container>
        );
    }
}

export default ControlCatalogue;